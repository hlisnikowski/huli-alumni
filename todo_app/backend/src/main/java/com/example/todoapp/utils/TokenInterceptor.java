//package com.example.todoapp.utils;
//
//import com.example.todoapp.exceptions.TodoException;
//import com.example.todoapp.models.ResponseError;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//@Component
//public class TokenInterceptor implements HandlerInterceptor {
//
//  // Handles token errors
//  @Override
//  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//      throws Exception {
//
//    ResponseError err = (ResponseError) request.getAttribute("error");
//    if(err != null){
//      throw new TodoException(err.getError(),err.getStatus());
//    }
//    return HandlerInterceptor.super.preHandle(request, response, handler);
//  }
//
//  @Override
//  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//                         ModelAndView modelAndView) throws Exception {
//    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
//  }
//
//  @Override
//  public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
//                              Object handler, Exception ex) throws Exception {
//    HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
//  }
//}
