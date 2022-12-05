package com.example.todoapp.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

  @NotNull(message = "Email cannot be empty")
  @Email(message = "Please enter a valid email address")
  private String email;

  @NotNull(message = "Password cannot be empty")
  @Length(min = 7, message = "Password should be at least 7 characters long")
  private String password;

}
