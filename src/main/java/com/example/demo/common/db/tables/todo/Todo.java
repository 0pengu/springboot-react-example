package com.example.demo.common.db.tables.todo;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // According to some docs, Hibernate requires a no-arg constructor.
    @SuppressWarnings("unused")
    private Todo() {
    }

    public Todo(String description) {
        this.description = description;
        createdAt = LocalDateTime.now();
    }

    public Todo(String description, Boolean completed) {
        this.description = description;
        this.completed = completed;
        createdAt = LocalDateTime.now();
    }

    public String getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return this.completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}