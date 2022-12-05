package com.example.todoapp.dtos;

import com.example.todoapp.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {

  private String username;

  public static UserProfileDTO toProfile(User user){
   return UserProfileDTO.builder()
        .username(user.getUsername())
        .build();
  }
}
