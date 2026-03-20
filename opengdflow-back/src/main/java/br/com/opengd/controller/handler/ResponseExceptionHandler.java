//package br.com.opengd.controller.handler;
//
//import br.com.opengd.exception.BusinessException;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.context.request.WebRequest;
//import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@ControllerAdvice
//public class ResponseExceptionHandler extends ResponseEntityExceptionHandler {
//
//    @ExceptionHandler(value = {BusinessException.class})
//    protected ResponseEntity<Object> handleExceptionAll(Exception ex, WebRequest request) {
//        Map<String, String> errors = new HashMap<>();
//        errors.put("exception", ex.getClass().getSimpleName());
//        errors.put("message", ex.getMessage());
//        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
//        if (ex instanceof BusinessException) {
//            logger.warn(ex.getMessage());
//            status = HttpStatus.BAD_REQUEST;
//        } else {
//            logger.error(ex.getMessage());
//        }
//        return handleExceptionInternal(ex, errors, new HttpHeaders(), status, request);
//    }
//
//    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
//    public ResponseEntity<Object> handleTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
//        String fieldName = ex.getName();
//        String errorMessage = String.format("O campo '%s' recebeu um valor inválido: '%s'. Esperado um número.", fieldName, ex.getValue());
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("error", errorMessage);
//        response.put("field", fieldName);
//
//        return ResponseEntity.badRequest().body(response);
//    }
//}