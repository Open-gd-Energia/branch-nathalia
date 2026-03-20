package br.com.opengd.controller.handler;

import br.com.opengd.exception.BusinessException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import org.hibernate.PropertyValueException;
import org.hibernate.query.QueryArgumentException;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.HttpRequestMethodNotSupportedException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        String errorMessage = "Erro ao processar a requisição.";
        Throwable cause = ex.getCause();

        if (cause instanceof MismatchedInputException mismatchedEx) {
            String fieldName = mismatchedEx.getPath().stream()
                    .map(JsonMappingException.Reference::getFieldName)
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse("desconhecido");

            errorMessage = String.format("O campo '%s' recebeu um valor inválido.", fieldName);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("exception", ex.getClass().getSimpleName());
        response.put("message", errorMessage);
        response.put("details", ex.getMessage());


        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Map<String, Object>> handleBusinessException(BusinessException ex, WebRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("exception", ex.getClass().getSimpleName());
        response.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
    }

    @ExceptionHandler(PropertyValueException.class)
    public ResponseEntity<Map<String, Object>> handlePropertyValueException(PropertyValueException ex) {
        String errorMessage = String.format("O campo '%s' não pode ser nulo.", ex.getPropertyName());

        Map<String, Object> response = new HashMap<>();
        response.put("exception", ex.getClass().getSimpleName());
        response.put("message", errorMessage);
        response.put("details", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return errors;
    }

    @ExceptionHandler(PSQLException.class)
    public ResponseEntity<Map<String, String>> handlePSQLException(PSQLException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("exception", "DatabaseException");
        errorResponse.put("message", "Erro no banco de dados");
        errorResponse.put("details", ex.getMessage()); // Descrição do erro
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @ExceptionHandler(QueryArgumentException.class)
    public ResponseEntity<Map<String, String>> handleQueryArgumentException(QueryArgumentException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("exception", "QueryArgumentException");
        errorResponse.put("message", "Erro nos parâmetros da consulta.");
        errorResponse.put("details", ex.getMessage()); // Detalhes técnicos do erro
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleMethodNotAllowed(HttpRequestMethodNotSupportedException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("exception", ex.getClass().getSimpleName());
        errorResponse.put("message", "Método não permitido para esta URL. Use o método HTTP correto (ex.: login = POST).");
        errorResponse.put("details", ex.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("exception", ex.getClass().getSimpleName());
        errorResponse.put("message", "Erro interno no servidor.");
        errorResponse.put("details", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}