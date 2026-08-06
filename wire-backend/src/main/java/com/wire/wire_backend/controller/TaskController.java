package com.wire.wire_backend.controller;

import com.wire.wire_backend.model.Task;
import com.wire.wire_backend.model.User;
import com.wire.wire_backend.repository.TaskRepository;
import com.wire.wire_backend.repository.UserRepository;
import com.wire.wire_backend.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository, EmailService emailService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    private User getAuthenticatedUser(Authentication auth) {
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    @GetMapping
    public List<Task> getAllTasks(Authentication auth) {
        User user = getAuthenticatedUser(auth);
        return taskRepository.findByUserUsername(user.getUsername());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task, Authentication auth) {
        User user = getAuthenticatedUser(auth);
        task.setUser(user);
        Task saved = taskRepository.save(task);

        if (saved.getDueDate() != null) {
            String subject = "New Task Scheduled: " + saved.getTitle();
            String body = "Hi " + user.getUsername() + ",\n\n"
                    + "A new task has been added to your dashboard:\n\n"
                    + "Title: " + saved.getTitle() + "\n"
                    + "Priority: " + saved.getPriority() + "\n"
                    + "Due: " + saved.getDueDate() + "\n\n"
                    + "- WIRE Task Manager";
            emailService.sendTaskNotification(user.getEmail(), subject, body);
        }

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, Authentication auth) {
        User user = getAuthenticatedUser(auth);
        Task existing = taskRepository.findById(id).orElse(null);

        if (existing == null || !existing.getUser().getUsername().equals(user.getUsername())) {
            return ResponseEntity.status(404).body("Task not found.");
        }

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setCompleted(updatedTask.isCompleted());
        existing.setPriority(updatedTask.getPriority());
        existing.setDueDate(updatedTask.getDueDate());

        Task saved = taskRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, Authentication auth) {
        User user = getAuthenticatedUser(auth);
        Task existing = taskRepository.findById(id).orElse(null);

        if (existing == null || !existing.getUser().getUsername().equals(user.getUsername())) {
            return ResponseEntity.status(404).body("Task not found.");
        }

        taskRepository.delete(existing);
        return ResponseEntity.ok("Task deleted.");
    }
}