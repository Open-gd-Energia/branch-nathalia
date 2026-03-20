package br.com.opengd.controller;

import br.com.opengd.controller.request.PermissaoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.PermissaoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.PermissaoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissoes")
@RequiredArgsConstructor
public class PermissaoController {

    private final PermissaoUseCase permissaoUseCase;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar todas as permissões cadastradas")
    public ResponseEntity<List<PermissaoResponse>> listAll() {
        return ResponseEntity.ok(permissaoUseCase.list());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<PermissaoResponse> create(@RequestBody PermissaoRequest request) throws BusinessException {
        return ResponseEntity.ok(permissaoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<PermissaoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody PermissaoRequest request) throws BusinessException {
        return ResponseEntity.ok(permissaoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        permissaoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Permissão excluido com sucesso!"));
    }
}
