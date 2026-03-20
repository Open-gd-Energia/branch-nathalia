package br.com.opengd.controller;

import br.com.opengd.controller.request.ParametroRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.ParametroResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.ParametroUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/parametros")
@RequiredArgsConstructor
public class ParametroController {

    private final ParametroUseCase parametroUseCase;

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<ParametroResponse> create(@Valid @RequestBody ParametroRequest request) throws BusinessException {
        return ResponseEntity.ok(parametroUseCase.create(request));
    }

    @PutMapping("/{chave}")
    @Operation(summary = "Atualizar um objeto pela chave")
    public ResponseEntity<ParametroResponse> update(@PathVariable("chave") String chave, @Valid @RequestBody ParametroRequest request) throws BusinessException {
        return ResponseEntity.ok(parametroUseCase.update(chave, request));
    }

    @DeleteMapping("/{chave}")
    @Operation(summary = "Deletar um novo objeto pela chave")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("chave") String chave) throws BusinessException {
        parametroUseCase.delete(chave);
        return ResponseEntity.ok(new BooleanResponse("Parametro excluido com sucesso!"));
    }

    @GetMapping("/{chave}")
    @Operation(summary = "Buscar um objeto pela chave")
    public ResponseEntity<ParametroResponse> get(@PathVariable("chave") String chave) throws BusinessException {
        return ResponseEntity.ok(parametroUseCase.get(chave));
    }
}