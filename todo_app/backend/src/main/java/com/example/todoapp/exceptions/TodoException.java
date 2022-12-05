package com.example.todoapp.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Setter
@Getter
public class TodoException extends RuntimeException {
  private HttpStatus status;

  public TodoException(String message){
    super(message);
    this.status = HttpStatus.BAD_REQUEST;
  }

  public TodoException(String message, HttpStatus status){
    super(message);
    this.status = status;
  }
}
