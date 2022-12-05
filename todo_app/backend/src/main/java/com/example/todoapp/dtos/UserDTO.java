package com.example.todoapp.dtos;

import com.example.todoapp.models.User;
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
public class UserDTO extends LoginDTO {

  @NotNull(message = "Username cannot be empty")
  @Length(min = 5, message = "Username should be at least 5 characters long")
  private String username;

}
