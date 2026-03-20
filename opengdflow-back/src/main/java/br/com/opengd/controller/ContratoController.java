package br.com.opengd.controller;

import br.com.opengd.controller.request.ContratoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.ContratoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.ContratoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/contratos")
@RequiredArgsConstructor
public class ContratoController {

    private final ContratoUseCase consumidorUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, dataInicial, dataFinal, descricao")
    public ResponseEntity<List<ContratoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<ContratoResponse> responseList = consumidorUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<ContratoResponse> create(@Valid @RequestBody ContratoRequest request) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<ContratoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody ContratoRequest request) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        consumidorUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Contrato desativado com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<ContratoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.get(id));
    }
}