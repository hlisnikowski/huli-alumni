package com.example.todoapp.config;


import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.todoapp.exceptions.TodoException;
import com.example.todoapp.utils.Util;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Objects;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class CustomFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) throws IOException {
    String authorizationHeader = request.getHeader(AUTHORIZATION);
    try {
      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        String token = authorizationHeader.substring("Bearer ".length());


        Algorithm algorithm =
            Algorithm.HMAC512(
                Objects.requireNonNull(Util.Singleton().env("SECRET_KEY"))
                    .getBytes(StandardCharsets.UTF_8));

        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);

        String email = decodedJWT.getSubject();
        request.setAttribute("email",email);

       // String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
       // stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
      } else {
        throw new TodoException("Access denied.");
      }
    } catch (Exception e) {
      response.setStatus(FORBIDDEN.value());
      response.setContentType(APPLICATION_JSON_VALUE);
      HashMap<String, String> error = new HashMap<>();
      error.put("Error", e.getMessage());
      new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
    }
}
