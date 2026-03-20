package br.com.opengd.controller;

import br.com.opengd.controller.request.PerfilPermissoesRequest;
import br.com.opengd.controller.response.PerfilPermissoesResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.PerfilUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perfils")
@RequiredArgsConstructor
public class PerfilPermissaoController {

    private final PerfilUseCase perfilUseCase;

    @GetMapping("/{id}/permissoes")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar todas as permissões de um perfil")
    public ResponseEntity<PerfilPermissoesResponse> getPermissoes(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(perfilUseCase.getPermissoes(id));
    }

    @PutMapping("/{id}/permissoes")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar as permissões de um perfil")
    public ResponseEntity<PerfilPermissoesResponse> putPermissoes(@PathVariable("id") Long id, @Valid @RequestBody PerfilPermissoesRequest request) throws BusinessException {
        return ResponseEntity.ok(perfilUseCase.putPermissoes(id, request));
    }
}