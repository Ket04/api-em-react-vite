package br.com.fatec.api.infra;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Hidden // Esta anotação diz ao Swagger: "Não tente ler esta classe"
@RestControllerAdvice
public class RestExceptionHandler {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

    // 1. Trata erros de busca (Ex: Produto não encontrado)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex) {
        ex.printStackTrace();
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // 2. Trata erros de validação do Hibernate (Na hora de persistir no banco)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolation(ConstraintViolationException ex) {
        String mensagem = ex.getConstraintViolations()
                .stream()
                .map(violation -> violation.getMessage())
                .findFirst()
                .orElse("Erro de validação nos dados");

        return buildResponse(HttpStatus.BAD_REQUEST, mensagem);
    }

    // 3. Trata erros de validação do Spring (Camada de Controller/@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String mensagem = (fieldError != null) ? fieldError.getDefaultMessage() : "Requisição inválida";

        return buildResponse(HttpStatus.BAD_REQUEST, mensagem);
    }

    /**
     * Método auxiliar para padronizar a resposta de erro da API.
     * Inclui o timestamp formatado e o código de status com texto amigável.
     */
    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(formatter));

        // Formata o status como "404 Not Found" ou "400 Bad Request"
        body.put("status", status.value() + " " + status.getReasonPhrase());
        body.put("message", message);

        return ResponseEntity.status(status).body(body);
    }
}