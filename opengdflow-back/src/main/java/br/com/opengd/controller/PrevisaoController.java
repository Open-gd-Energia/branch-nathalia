package br.com.opengd.controller;

import br.com.opengd.controller.request.PrevisaoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.PrevisaoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.PrevisaoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/previsoes")
@RequiredArgsConstructor
public class PrevisaoController {

    private final PrevisaoUseCase previsaoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, mesReferencia")
    public ResponseEntity<List<PrevisaoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(previsaoUseCase.findByAttributes(params));
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<PrevisaoResponse> create(@Valid @RequestBody PrevisaoRequest request) throws BusinessException {
        return ResponseEntity.ok(previsaoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<PrevisaoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody PrevisaoRequest request) throws BusinessException {
        return ResponseEntity.ok(previsaoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        previsaoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Previsão excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<PrevisaoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(previsaoUseCase.get(id));
    }
}