package com.example.todoapp.controllers;


import com.example.todoapp.dtos.LoginDTO;
import com.example.todoapp.dtos.TodoDTO;
import com.example.todoapp.dtos.UserDTO;
import com.example.todoapp.exceptions.TodoException;
import com.example.todoapp.models.ResponseError;
import com.example.todoapp.services.UserService;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class TodoController {

  private final UserService userService;

  @GetMapping("/")
  public ResponseEntity<?> test(){
    return ResponseEntity.ok().build();
  }

  //region LOGIN

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginDTO user, BindingResult result) {
    if(result.hasErrors()){
      handleBinding(result);
    }
    return ResponseEntity.ok(userService.login(user));
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody UserDTO user, BindingResult result) {
    if(result.hasErrors()){
      handleBinding(result);
    }
    userService.register(user);
    return ResponseEntity.ok("Account has been successfully created");
  }
  // Handle validation for Login & Register
  public void handleBinding(BindingResult result){
    throw new TodoException(result.getAllErrors()
        .get(0)
        .getDefaultMessage(),
        HttpStatus.BAD_REQUEST
    );
  }
  //endregion

  //region Auth
  @GetMapping("/user")
  public ResponseEntity<?> getUserProfile(HttpServletRequest request){
    return ResponseEntity.ok(userService.getUserProfile(
         getUser(request)
    ));
  }
  //endregion

  //region TodoCo
  @DeleteMapping("/todo/{title}")
  public ResponseEntity<?> deleteTodo(@PathVariable String title, HttpServletRequest request){
    if(userService.deleteTodo(title,getUser(request))){
      return ResponseEntity.ok().build();
    } return ResponseEntity.status(404).body(
        new ResponseError("Unable to delete this todo").getError()
    );
  }

  @PatchMapping("/todo/{title}")
  public ResponseEntity<?> checkTodo(@PathVariable String title, HttpServletRequest request){
    if(userService.checkTodo(title,getUser(request))){
      return ResponseEntity.ok().build();
    } return ResponseEntity.status(404).body(
        new ResponseError("Unable to check this todo").getError()
    );
  }

  @PatchMapping("/todo/change-title")
  public ResponseEntity<?> changeTitle(@RequestBody TodoDTO todo, HttpServletRequest request){
      userService.changeDescription(todo.getTitle(),todo.getDescription(),getUser(request));
      return ResponseEntity.ok().build();
  }

  @PostMapping("/todo")
  public ResponseEntity<?> addTodo(HttpServletRequest request, @RequestBody TodoDTO todo){
      userService.addTodo(todo,getUser(request));
    return ResponseEntity.ok().build();
  }

  //endregion





  public String getUser(HttpServletRequest request){
    return (String) request.getAttribute("email");
  }
}
