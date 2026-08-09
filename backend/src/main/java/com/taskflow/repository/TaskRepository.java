package com.taskflow.repository;

import com.taskflow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.taskflow.entity.User;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitleContainingIgnoreCase(String title);
    List<Task> findByUserAndTitleContainingIgnoreCase(User user, String title);
    Page<Task> findAll(Pageable pageable);
    Page<Task> findByUser(User user, Pageable pageable);
    List<Task> findByUser(User user);
}