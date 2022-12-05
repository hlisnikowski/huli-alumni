package com.example.todoapp.dtos;

import com.example.todoapp.models.Todo;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoDTO {
  private String title;
  private String description;
  private LocalDate finish;
  private boolean done;

  public static TodoDTO toDTO(Todo todo){
    return TodoDTO.builder()
        .description(todo.getDescription())
        .done(todo.isDone())
        .finish(todo.getFinish())
        .title(todo.getTitle())
        .build();
  }
}
