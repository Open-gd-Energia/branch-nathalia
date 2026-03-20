package br.com.opengd.controller;

import br.com.opengd.controller.request.DistribuidoraRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.DistribuidoraResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.DistribuidoraUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/distribuidoras")
@RequiredArgsConstructor
public class DistribuidoraController {

    private final DistribuidoraUseCase distribuidoraUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: sigla, nome")
    public ResponseEntity<List<DistribuidoraResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<DistribuidoraResponse> responseList = distribuidoraUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<DistribuidoraResponse> create(@Valid @RequestBody DistribuidoraRequest request) throws BusinessException {
        return ResponseEntity.ok(distribuidoraUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<DistribuidoraResponse> update(@PathVariable("id") Long id, @Valid @RequestBody DistribuidoraRequest request) throws BusinessException {
        return ResponseEntity.ok(distribuidoraUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        distribuidoraUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Distribuidora desativada com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<DistribuidoraResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(distribuidoraUseCase.get(id));
    }
}