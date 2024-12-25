package com.example.demo.api.todo;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.db.tables.todo.Todo;
import com.example.demo.common.db.tables.todo.TodoRepository;
import com.example.demo.common.dto.ApiResponse;

@RestController
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Todo>>> getAllTodos() {
        Iterable<Todo> todos = this.todoRepository.findAll();

        // I only did this because the order of the todos were being moved around which
        // looked really janky on the UI.
        List<Todo> sortedTodos = StreamSupport.stream(todos.spliterator(), false)
                .sorted(Comparator.comparing(Todo::getCreatedAt)).collect(Collectors.toList());

        return ResponseEntity.ok().body(new ApiResponse<List<Todo>>(true, "Todos have been found!", sortedTodos));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Void>> addTodo(@RequestBody Map<String, Object> body) {
        try {
            if (!body.containsKey("description") || !(body.get("description") instanceof String)) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse<>(false, "Description is required and must be a string.", null));
            }

            String description = (String) body.get("description");

            if (description.length() < 1) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse<>(false, "Description must be at least one character long.", null));
            }

            if (description.length() > 150) {
                return ResponseEntity.status(400)
                        .body(new ApiResponse<>(false, "Description cannot be longer than 150 characters.", null));
            }

            this.todoRepository.save(new Todo(description));
            return ResponseEntity.ok(new ApiResponse<>(true, "Todo saved!", null));
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(500)
                    .body(new ApiResponse<>(false, "Something went wrong. Please try again later.", null));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(@RequestBody Map<String, Object> body) {
        if (!body.containsKey("id") || !(body.get("id") instanceof String)) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse<>(false, "ID is required and must be a string.", null));
        }

        String id = (String) body.get("id");

        Optional<Todo> possiblyExistingTodo = this.todoRepository.findById(id);

        if (possiblyExistingTodo.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "Todo with this ID doesn't exist.", null));
        }

        Todo existingTodo = possiblyExistingTodo.get();

        this.todoRepository.delete(existingTodo);

        return ResponseEntity.ok(new ApiResponse<>(true, "Todo has been deleted!", null));
    }

    @PatchMapping("/update")
    public ResponseEntity<ApiResponse<Void>> updateTodo(@RequestBody Map<String, Object> body) {
        if (!body.containsKey("id") || !(body.get("id") instanceof String)) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse<>(false, "ID is required and must be a string.", null));
        }

        if (!body.containsKey("description") || !(body.get("description") instanceof String)) {
            return ResponseEntity.status(400).body(new ApiResponse<>(false, "Description is required.", null));
        }

        if (!body.containsKey("completed") || !(body.get("completed") instanceof Boolean)) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse<>(false, "Completed is missing and/or invalid.", null));
        }

        String id = (String) body.get("id");
        String description = (String) body.get("description");
        Boolean completed = (Boolean) body.get("completed");

        if (description.length() < 1) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse<>(false, "Description must be at least one character long.", null));
        }

        if (description.length() > 150) {
            return ResponseEntity.status(400)
                    .body(new ApiResponse<>(false, "Description cannot be longer than 150 characters.", null));
        }

        Optional<Todo> possiblyExistingTodo = this.todoRepository.findById(id);

        if (possiblyExistingTodo.isEmpty()) {
            return ResponseEntity.status(404).body(new ApiResponse<>(false, "Todo with this ID doesn't exist.", null));
        }

        Todo existingTodo = possiblyExistingTodo.get();

        existingTodo.setDescription(description);
        existingTodo.setCompleted(completed);

        this.todoRepository.save(existingTodo);

        return ResponseEntity.ok(new ApiResponse<>(true, "Todo has been updated!", null));
    }
}
