package com.example.todoapp.services;

import com.example.todoapp.dtos.LoginDTO;
import com.example.todoapp.dtos.TodoDTO;
import com.example.todoapp.dtos.UserDTO;
import com.example.todoapp.dtos.UserProfileDTO;
import com.example.todoapp.exceptions.TodoException;
import com.example.todoapp.models.User;
import java.util.List;

public interface UserService {

  void register(UserDTO user) throws TodoException;
  String login(LoginDTO user);
  boolean isUserPresent(User user);
  User getUserByEmail(String email);
  List<Object> getUserProfile(String email);
  boolean deleteTodo(String title, String email);
  boolean checkTodo(String title, String email);
  void addTodo(TodoDTO todo,String email);
  void changeDescription(String title, String description, String email);
}
