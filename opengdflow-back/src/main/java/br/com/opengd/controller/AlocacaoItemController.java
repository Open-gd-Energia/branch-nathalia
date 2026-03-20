package br.com.opengd.controller;

import br.com.opengd.controller.request.AlocacaoItemRequest;
import br.com.opengd.controller.response.AlocacaoItemResponse;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.AlocacaoItemUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alocacaoItem")
@RequiredArgsConstructor
public class AlocacaoItemController {

    private final AlocacaoItemUseCase alocacaoItemUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idConsumidor, idUsina, nomeUsina, nomeConsumidor  e statusAlocacao")
    public ResponseEntity<List<AlocacaoItemResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<AlocacaoItemResponse> responseList = alocacaoItemUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping("/alocacao/{idAlocacao}")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<AlocacaoItemResponse> create(@PathVariable("idAlocacao") Long idAlocacao, @Valid @RequestBody AlocacaoItemRequest request) throws BusinessException {
        return ResponseEntity.ok(alocacaoItemUseCase.create(idAlocacao, request));
    }

    @PutMapping("/alocacao/{idAlocacao}/consumidor/{idConsumidor}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<AlocacaoItemResponse> update(@PathVariable("idAlocacao") Long idAlocacao, @PathVariable("idConsumidor") Long idConsumidor, @Valid @RequestBody AlocacaoItemRequest request) throws BusinessException {
        return ResponseEntity.ok(alocacaoItemUseCase.update(idAlocacao, idConsumidor, request));
    }

    @DeleteMapping("/alocacao/{idAlocacao}/consumidor/{idConsumidor}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("idAlocacao") Long idAlocacao, @PathVariable("idConsumidor") Long idConsumidor) throws BusinessException {
        alocacaoItemUseCase.delete(idAlocacao, idConsumidor);
        return ResponseEntity.ok(new BooleanResponse("Alocacao Item excluido com sucesso!"));
    }

    @GetMapping("/alocacao/{idAlocacao}/consumidor/{idConsumidor}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<AlocacaoItemResponse> get(@PathVariable("idAlocacao") Long idAlocacao, @PathVariable("idConsumidor") Long idConsumidor) throws BusinessException {
        return ResponseEntity.ok(alocacaoItemUseCase.get(idAlocacao, idConsumidor));
    }
}