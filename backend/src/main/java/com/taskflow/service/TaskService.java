package com.taskflow.service;

import com.taskflow.dto.TaskRequestDTO;
import com.taskflow.dto.TaskResponseDTO;
import com.taskflow.entity.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create Task
    public TaskResponseDTO createTask(TaskRequestDTO request) {

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());

        Task savedTask = taskRepository.save(task);

        return new TaskResponseDTO(
                savedTask.getId(),
                savedTask.getTitle(),
                savedTask.getDescription(),
                savedTask.getStatus(),
                savedTask.getPriority()
        );
    }

    // Get All Tasks
    public List<TaskResponseDTO> getAllTasks() {

        return taskRepository.findAll()
                .stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority()
                ))
                .collect(Collectors.toList());
    }

    // Get Task By Id
    public TaskResponseDTO getTaskById(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority()
        );
    }

    // Update Task
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO request) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());

        Task updatedTask = taskRepository.save(task);

        return new TaskResponseDTO(
                updatedTask.getId(),
                updatedTask.getTitle(),
                updatedTask.getDescription(),
                updatedTask.getStatus(),
                updatedTask.getPriority()
        );
    }

    // Delete Task
    public void deleteTask(Long id) {

        taskRepository.deleteById(id);
    }

    public List<TaskResponseDTO> searchTasks(String title) {

        return taskRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority()
                ))
                .toList();
    }
    public Page<TaskResponseDTO> getTasksWithPagination(int page, int size) {

        return taskRepository.findAll(PageRequest.of(page, size))
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getStatus(),
                        task.getPriority()
                ));
    }
}