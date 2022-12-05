//package com.example.todoapp.config;
//
//
//import com.example.todoapp.utils.TokenInterceptor;
//import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Configuration
//public class WebSecurityConfig extends WebMvcConfigurationSupport {
//
//  @Override
//  protected void addInterceptors(InterceptorRegistry registry) {
//    registry.addInterceptor(new TokenInterceptor())
//        .addPathPatterns("/**");
//  }
//}
