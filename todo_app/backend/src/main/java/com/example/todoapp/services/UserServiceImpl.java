package com.example.todoapp.services;

import static com.example.todoapp.config.SecurityConfig.TOKEN_EXPIRATION_TIME;

import com.example.todoapp.dtos.LoginDTO;
import com.example.todoapp.dtos.TodoDTO;
import com.example.todoapp.dtos.UserDTO;
import com.example.todoapp.dtos.UserProfileDTO;
import com.example.todoapp.exceptions.TodoException;
import com.example.todoapp.models.Todo;
import com.example.todoapp.models.User;
import com.example.todoapp.repositories.TodoRepository;
import com.example.todoapp.repositories.UserRepository;

import com.example.todoapp.utils.Util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

  private final BCryptPasswordEncoder bcrypt;

  private final UserRepository userRepository;

  private final TodoRepository todoRepository;

  @Override
  public void register(UserDTO user) {
   if (isUserPresent(User.toModel(user)))
     throw new TodoException("User with this email already exists.");
   user.setPassword(
       bcrypt.encode(user.getPassword())
   );
    userRepository.save(User.toModel(user));
  }

  @Override
  public String login(LoginDTO login) {
    Optional<User> user = userRepository.findByEmail(login.getEmail());
    if(user.isEmpty() || !isPasswordValid(user.get().getPassword(),login.getPassword()))
      throw new TodoException("Wrong email or password") ;
    return getJWT(login);
  }

  private String getJWT(LoginDTO user){
    String secretKey = Util.Singleton().env("SECRET_KEY");
    return Jwts.builder()
        .setId("user")
        .setSubject(user.getEmail())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, secretKey.getBytes())
        .compact();
   }

  @Override
  public boolean isUserPresent(User user) {
    return userRepository.findByEmail(user.getEmail()).isPresent();
  }

  public boolean isPasswordValid(String hashed, String encoded){
    return bcrypt.matches(encoded,hashed);
  }

  @Override
  public List<Object> getUserProfile(String email){
    List<Object> result = new ArrayList<>();
    result.add(UserProfileDTO.toProfile(getUserByEmail(email)));
    result.add(todoRepository.findAllByOwner(
        userRepository.findByEmail(email).get()
    ).stream()
        .map(TodoDTO::toDTO)
        .toList());
    return result;
  }

  // ONLY FOR TOKEN WHEN WE DONT NEED VALIDATE PASSWORD
  @Override
  public User getUserByEmail(String email) {
    Optional<User> user = userRepository.findByEmail(email);
    if(user.isEmpty()) throw new TodoException("User with this email does not exist.");
    return user.get();
  }

  @Override
  public boolean deleteTodo(String title, String email){
    title = title.replace('_',' ');
    User user = getUserByEmail(email);
     todoRepository.deleteTodoByTitleAndOwner(title,user);
     return true;
  }

  @Override
  public boolean checkTodo(String title, String email){
    title = title.replace('_',' ');
    User user = getUserByEmail(email);
    Optional<Todo> todo = todoRepository.findTodoByTitleAndOwner(title,user);
    if(todo.isEmpty()) return false;
    todo.get().check();
    todoRepository.save(todo.get());
    return true;
  }

  @Override
  public void addTodo(TodoDTO todo, String email){
    if(todoRepository.findTodoByTitleAndOwner(todo.getTitle(), getUserByEmail(email)).isPresent())
      throw new TodoException("Todo with this title already exists.");
    Todo newTodo = Todo.toModel(todo);
    newTodo.setOwner(getUserByEmail(email));
    todoRepository.save(newTodo);
  }

  @Override
  public void changeDescription(String title, String description, String email){
    Todo todo = todoRepository.findTodoByTitleAndOwner(title, getUserByEmail(email))
        .orElseThrow(() -> new TodoException("Todo with this old title does not exist."));
    todo.setDescription(description);
    todoRepository.save(todo);
  }

}
