package br.com.opengd.controller;

import br.com.opengd.controller.request.BandeiraTarifariaRequest;
import br.com.opengd.controller.response.BandeiraTarifariaResponse;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.BandeiraTarifariaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bandeiraTarifaria")
@RequiredArgsConstructor
public class BandeiraTarifariaController {

    private final BandeiraTarifariaUseCase bandeiraTarifariaUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, descricao")
    public ResponseEntity<List<BandeiraTarifariaResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<BandeiraTarifariaResponse> responseList = bandeiraTarifariaUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @Operation(summary = "Salvar um novo objeto")
    @PostMapping
    public ResponseEntity<BandeiraTarifariaResponse> create(@Valid @RequestBody BandeiraTarifariaRequest request) throws BusinessException {
        return ResponseEntity.ok(bandeiraTarifariaUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<BandeiraTarifariaResponse> update(@PathVariable("id") Long id, @Valid @RequestBody BandeiraTarifariaRequest request) throws BusinessException {
        return ResponseEntity.ok(bandeiraTarifariaUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        bandeiraTarifariaUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Bandeira Tarifaria excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<BandeiraTarifariaResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(bandeiraTarifariaUseCase.get(id));
    }
}