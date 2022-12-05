package com.example.todoapp.controllers;

import com.example.todoapp.exceptions.TodoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TodoErrorHandler {

  @ExceptionHandler(TodoException.class)
  public ResponseEntity<?> handle(TodoException e){
    return ResponseEntity.status(e.getStatus()).body(e.getMessage());
  }

}
