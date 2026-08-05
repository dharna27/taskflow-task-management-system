package com.taskflow.controller;

import com.taskflow.dto.TaskRequestDTO;
import com.taskflow.dto.TaskResponseDTO;
import com.taskflow.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create Task
    @PostMapping
    public TaskResponseDTO createTask(@Valid @RequestBody TaskRequestDTO request) {
        return taskService.createTask(request);
    }

    // Get All Tasks
    @GetMapping
    public List<TaskResponseDTO> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get Task By Id
    @GetMapping("/{id}")
    public TaskResponseDTO getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // Update Task
    @PutMapping("/{id}")
    public TaskResponseDTO updateTask(@PathVariable Long id,
                                      @Valid @RequestBody TaskRequestDTO request) {
        return taskService.updateTask(id, request);
    }

    // Delete Task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/search")
    public List<TaskResponseDTO> searchTasks(@RequestParam String title) {
        return taskService.searchTasks(title);
    }

    @GetMapping("/page")
    public Page<TaskResponseDTO> getTasksWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return taskService.getTasksWithPagination(page, size);
    }
}