package br.com.opengd.controller;

import br.com.opengd.controller.request.RepresentanteRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.RepresentanteResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.RepresentanteUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/representantes")
@RequiredArgsConstructor
public class RepresentanteController {

    private final RepresentanteUseCase representanteUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: cpf, cnpj, (nomeFisica OR razaoSocial OR nomeFantasia), status")
    public ResponseEntity<List<RepresentanteResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<RepresentanteResponse> responseList = representanteUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @Operation(summary = "Salvar um novo objeto")
    @PostMapping
    public ResponseEntity<RepresentanteResponse> create(@Valid @RequestBody RepresentanteRequest request) throws BusinessException {
        return ResponseEntity.ok(representanteUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<RepresentanteResponse> update(@PathVariable("id") Long id, @Valid @RequestBody RepresentanteRequest request) throws BusinessException {
        return ResponseEntity.ok(representanteUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        representanteUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Representante desativado com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<RepresentanteResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(representanteUseCase.get(id));
    }
}