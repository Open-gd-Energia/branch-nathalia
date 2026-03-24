package br.com.opengd.controller;

import br.com.opengd.controller.request.PerfilRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.PerfilResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.PerfilUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfis")
@RequiredArgsConstructor
public class PerfilController {

    private final PerfilUseCase perfilUseCase;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome")
    public List<PerfilResponse> listAll() {
        return perfilUseCase.list();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<PerfilResponse> create(@RequestBody PerfilRequest request) throws BusinessException {
        return ResponseEntity.ok(perfilUseCase.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<PerfilResponse> update(@PathVariable("id") Long id, @Valid @RequestBody PerfilRequest request) throws BusinessException {
        return ResponseEntity.ok(perfilUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        perfilUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Perfil excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<PerfilResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(perfilUseCase.get(id));
    }
}