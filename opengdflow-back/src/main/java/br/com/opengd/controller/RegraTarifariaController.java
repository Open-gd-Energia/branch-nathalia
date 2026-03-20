package br.com.opengd.controller;

import br.com.opengd.controller.request.RegraTarifariaRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.RegraTarifariaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.RegraTarifariaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/regraTarifaria")
@RequiredArgsConstructor
public class RegraTarifariaController {

    private final RegraTarifariaUseCase regraTarifariaUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, descricao")
    public ResponseEntity<List<RegraTarifariaResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<RegraTarifariaResponse> responseList = regraTarifariaUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<RegraTarifariaResponse> create(@Valid @RequestBody RegraTarifariaRequest request) throws BusinessException {
        return ResponseEntity.ok(regraTarifariaUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<RegraTarifariaResponse> update(@PathVariable("id") Long id, @Valid @RequestBody RegraTarifariaRequest request) throws BusinessException {
        return ResponseEntity.ok(regraTarifariaUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        regraTarifariaUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Regra Tarifaria excluida com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<RegraTarifariaResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(regraTarifariaUseCase.get(id));
    }
}