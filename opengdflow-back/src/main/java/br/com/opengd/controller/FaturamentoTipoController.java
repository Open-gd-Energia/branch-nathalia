package br.com.opengd.controller;

import br.com.opengd.controller.request.FaturamentoTipoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.FaturamentoTipoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.FaturamentoTipoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/faturamentos-tipo")
@RequiredArgsConstructor
public class FaturamentoTipoController {

    private final FaturamentoTipoUseCase faturamentoTipoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, descricao, referencia")
    public ResponseEntity<List<FaturamentoTipoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<FaturamentoTipoResponse> responseList = faturamentoTipoUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<FaturamentoTipoResponse> create(@Valid @RequestBody FaturamentoTipoRequest request) throws BusinessException {
        return ResponseEntity.ok(faturamentoTipoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<FaturamentoTipoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody FaturamentoTipoRequest request) throws BusinessException {
        return ResponseEntity.ok(faturamentoTipoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        faturamentoTipoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Faturamento Tipo excluida com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<FaturamentoTipoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(faturamentoTipoUseCase.get(id));
    }
}