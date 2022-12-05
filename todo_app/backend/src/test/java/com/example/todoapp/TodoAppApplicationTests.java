package com.example.todoapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.example.todoapp.repositories.TodoRepository;
import com.example.todoapp.repositories.UserRepository;
import com.example.todoapp.services.UserServiceImpl;
import java.io.IOException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TodoAppApplicationTests {

  private final UserRepository userRepository = mock(UserRepository.class);
  private final TodoRepository todoRepository = mock(TodoRepository.class);
  BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
  UserServiceImpl userService = new UserServiceImpl(bCryptPasswordEncoder, userRepository,
      todoRepository);

  @Autowired
  private MockMvc mvc;

  @Test
  @DisplayName("Unit Test : Password Validation : UserService")
  public void isPasswordValid(){
    assertTrue(userService.isPasswordValid(
        "$2a$10$Osg3Zmh6okgVaaHKGaw.NeoFb0eIptoV0qoCWAymH4.nVfIzRC7hm",
        "1234567"
        ));
  }

  @Test
  @DisplayName("Integration Test : Login : UserService")
  public void login() throws Exception {
    mvc.perform(post("/api/login")
        .content("{\"email\": \"test@seznam.cz\", \"password\": 1234567}")
        .contentType("application/json"))
        .andExpect(status().isOk());
  }

}
