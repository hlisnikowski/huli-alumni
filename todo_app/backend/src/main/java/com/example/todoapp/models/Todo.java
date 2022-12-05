package com.example.todoapp.models;

import com.example.todoapp.dtos.TodoDTO;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Entity
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String description;
  private LocalDate finish;
  private boolean done;

  @ManyToOne
  private User owner;

  public void check(){
    done = !done;
  }

  public static Todo toModel(TodoDTO todo){
    return Todo.builder()
        .description(todo.getDescription())
        .title(todo.getTitle())
        .done(todo.isDone())
        .finish(todo.getFinish())
        .build();
  }

}
