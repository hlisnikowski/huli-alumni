package com.example.todoapp.models;

import com.example.todoapp.dtos.UserDTO;
import java.util.Collection;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Builder
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username;

  @Column(name = "email")
  private String email;

  private String password;

  @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
  private Set<Todo> todos;


  public static User toModel(UserDTO user){
    return User.builder()
        .username(user.getUsername())
        .email(user.getEmail())
        .password(user.getPassword())
        .build();
  }



}
