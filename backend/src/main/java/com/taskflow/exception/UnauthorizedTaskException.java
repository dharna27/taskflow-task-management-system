package com.taskflow.exception;

public class UnauthorizedTaskException extends RuntimeException {

    public UnauthorizedTaskException(String message) {
        super(message);
    }
}