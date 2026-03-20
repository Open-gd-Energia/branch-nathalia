package br.com.opengd.controller;

import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.FaturaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/faturas")
@RequiredArgsConstructor
public class FaturaController {

    private final FaturaUseCase faturaUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nomeUsina, nomeConsumidor, ucUsina, ucConsumidor, referenciaInicial, referenciaFinal, vencimentoInicial, vencimentoFinal, status")
    public ResponseEntity<List<FaturaResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<FaturaResponse> responseList = faturaUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<FaturaResponse> create(@Valid @RequestBody FaturaRequest request) throws BusinessException {
        return ResponseEntity.ok(faturaUseCase.create(request, null));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<FaturaResponse> update(@PathVariable("id") Long id, @Valid @RequestBody FaturaRequest request) throws BusinessException {
        return ResponseEntity.ok(faturaUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        faturaUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Fatura excluida com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<FaturaResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(faturaUseCase.get(id));
    }
}