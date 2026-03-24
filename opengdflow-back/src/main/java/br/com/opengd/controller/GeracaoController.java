package br.com.opengd.controller;

import br.com.opengd.controller.request.GeracaoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.GeracaoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.GeracaoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/geracoes")
@RequiredArgsConstructor
public class GeracaoController {

    private final GeracaoUseCase geracaoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, mesReferencia")
    public ResponseEntity<List<GeracaoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(geracaoUseCase.findByAttributes(params));
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<GeracaoResponse> create(@Valid @RequestBody GeracaoRequest request) throws BusinessException {
        return ResponseEntity.ok(geracaoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<GeracaoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody GeracaoRequest request) throws BusinessException {
        return ResponseEntity.ok(geracaoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        geracaoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Geração excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<GeracaoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(geracaoUseCase.get(id));
    }
}