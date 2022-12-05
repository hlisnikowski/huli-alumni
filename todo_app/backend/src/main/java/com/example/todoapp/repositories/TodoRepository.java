package com.example.todoapp.repositories;

import com.example.todoapp.models.Todo;
import com.example.todoapp.models.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
  List<Todo> findAllByOwner(User owner);
  void deleteTodoByTitleAndOwner(String title, User owner);
  Optional<Todo> findTodoByTitleAndOwner(String title, User owner);

}
