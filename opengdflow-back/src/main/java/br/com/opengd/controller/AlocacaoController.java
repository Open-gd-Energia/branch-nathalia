package br.com.opengd.controller;

import br.com.opengd.controller.request.AlocacaoRequest;
import br.com.opengd.controller.response.AlocacaoResponse;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.AlocacaoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alocacao")
@RequiredArgsConstructor
public class AlocacaoController {

    private final AlocacaoUseCase alocacaoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, dataInicio, dataFinal, status")
    public ResponseEntity<List<AlocacaoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<AlocacaoResponse> responseList = alocacaoUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<AlocacaoResponse> create(@Valid @RequestBody AlocacaoRequest request) throws BusinessException {
        return ResponseEntity.ok(alocacaoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<AlocacaoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody AlocacaoRequest request) throws BusinessException {
        return ResponseEntity.ok(alocacaoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        alocacaoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Alocação excluida com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<AlocacaoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(alocacaoUseCase.get(id));
    }
}