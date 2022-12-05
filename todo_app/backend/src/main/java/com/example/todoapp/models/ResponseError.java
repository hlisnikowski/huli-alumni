package com.example.todoapp.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class ResponseError {
  private String error;
  private HttpStatus status;

  public ResponseError(String msg){
    this.error = msg;
    status = HttpStatus.BAD_REQUEST;
  }
}
