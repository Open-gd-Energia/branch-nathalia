package br.com.opengd.controller;

import br.com.opengd.controller.request.TipoDescontoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.TipoDescontoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.TipoDescontoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tipoDesconto")
@RequiredArgsConstructor
public class TipoDescontoController {

    private final TipoDescontoUseCase tipoDescontoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, descricao")
    public ResponseEntity<List<TipoDescontoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<TipoDescontoResponse> responseList = tipoDescontoUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @Operation(summary = "Salvar um novo objeto")
    @PostMapping
    public ResponseEntity<TipoDescontoResponse> create(@Valid @RequestBody TipoDescontoRequest request) throws BusinessException {
        return ResponseEntity.ok(tipoDescontoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<TipoDescontoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody TipoDescontoRequest request) throws BusinessException {
        return ResponseEntity.ok(tipoDescontoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        tipoDescontoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("TipoDesconto excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<TipoDescontoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(tipoDescontoUseCase.get(id));
    }
}