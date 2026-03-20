package br.com.opengd.controller;

import br.com.opengd.controller.request.UsuarioLogRequest;
import br.com.opengd.controller.response.UsuarioLogResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.UsuarioLogUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarioLogs")
@RequiredArgsConstructor
public class UsuarioLogController {

    private final UsuarioLogUseCase usuarioLogUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsuario, evento, mensagem, origem, dataInicial, dataFinal")
    public ResponseEntity<List<UsuarioLogResponse>> findByAttributes(@RequestParam Map<String, String> params, Pageable pageable) {
        List<UsuarioLogResponse> usuarioLogs = usuarioLogUseCase.findByAttributes(params, pageable);
        return ResponseEntity.ok(usuarioLogs);
    }


    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<UsuarioLogResponse> create(@Valid @RequestBody UsuarioLogRequest request) throws BusinessException {
        if (request.getDataHora() == null) {
            request.setDataHora(LocalDateTime.now());
        }
        return ResponseEntity.ok(usuarioLogUseCase.create(request));
    }
}