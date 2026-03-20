package br.com.opengd.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/logApp")
@RequiredArgsConstructor
public class LogAppController {

    @GetMapping("/read")
    public ResponseEntity<String> readLast300Lines() {
        try {
            Path logFilePath = Paths.get("app.log"); // Caminho relativo ao diretório de execução
            if (!Files.exists(logFilePath)) {
                return ResponseEntity.notFound().build();
            }

            long totalLines = Files.lines(logFilePath).count();
            String content = Files.lines(logFilePath)
                    .skip(Math.max(0, totalLines - 300)) // Ignora as linhas iniciais
                    .collect(Collectors.joining("\n"));

            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao ler o arquivo de log: " + e.getMessage());
        }
    }
}