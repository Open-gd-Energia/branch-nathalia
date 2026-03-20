package br.com.opengd.controller;

import br.com.opengd.controller.request.CidadeRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.CidadeResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.CidadeUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cidades")
@RequiredArgsConstructor
public class CidadeController {

    private final CidadeUseCase cidadeUseCase;


    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome e uf")
    public ResponseEntity<List<CidadeResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(cidadeUseCase.findByAttributes(params));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<CidadeResponse> create(@Valid @RequestBody CidadeRequest request) throws BusinessException {
        return ResponseEntity.ok(cidadeUseCase.create(request));
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<CidadeResponse> update(@PathVariable("id") Long id, @Valid @RequestBody CidadeRequest request) throws BusinessException {
        return ResponseEntity.ok(cidadeUseCase.update(id, request));
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<CidadeResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(cidadeUseCase.get(id));
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        cidadeUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Cidade excluido com sucesso!"));
    }
}