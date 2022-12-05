//package com.example.todoapp.middleware;
//
//import com.example.todoapp.exceptions.TodoException;
//import com.example.todoapp.models.ResponseError;
//import com.example.todoapp.utils.Util;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@Component
//public class AuthenticationMiddleware extends OncePerRequestFilter {
//
//  @Override
//  @CrossOrigin
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//                                  FilterChain filterChain) throws ServletException, IOException {
//    if(authRequired(request.getRequestURI())){
//      String token = request.getHeader("Authorization");
//
//      if(token == null){
//        // Line 40 will catch this.
//        throw new RuntimeException("");
//      }
//        token = token.substring("Bearer ".length());
//      try {
//        Claims claims = Jwts.parser()
//            .setSigningKey(Util.Singleton().env("SECRET_KEY").getBytes())
//            .parseClaimsJws(token)
//            .getBody();
//        String email = claims.getSubject();
//        request.setAttribute("email",email);
//      } catch (Exception e){
//        request.setAttribute("error",
//            new ResponseError("Token is not valid.",HttpStatus.UNAUTHORIZED)
//        );
//      }
//    }
//    filterChain.doFilter(request,response);
//  }
//
//  // endpoints that require authentication
//  private final List<String> endpoints = List.of(
//      "user",
//      "todo"
//  );
//
//  private boolean authRequired(String url){
//    String endpoint = url.replace("/api/","");
//    if(endpoint.contains("/"))
//      return endpoints.contains(endpoint.split("/")[0]);
//    return endpoints.contains(endpoint);
//  }
//}
