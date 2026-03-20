package br.com.opengd.controller;

import br.com.opengd.controller.request.BancoRequest;
import br.com.opengd.controller.response.BancoResponse;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.BancoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bancos")
@RequiredArgsConstructor
public class BancoController {

    private final BancoUseCase bancoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome")
    public ResponseEntity<List<BancoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<BancoResponse> responseList = bancoUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<BancoResponse> create(@Valid @RequestBody BancoRequest request) throws BusinessException {
        return ResponseEntity.ok(bancoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<BancoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody BancoRequest request) throws BusinessException {
        return ResponseEntity.ok(bancoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        bancoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Banco excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<BancoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(bancoUseCase.get(id));
    }
}