package br.com.opengd.controller;

import br.com.opengd.controller.request.EnderecoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.EnderecoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.EnderecoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
@RequiredArgsConstructor
public class EnderecoController {
    private final EnderecoUseCase enderecoUseCase;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar por todos os endereços cadastrados")
    public ResponseEntity<List<EnderecoResponse>> findByAttributes() {
        return ResponseEntity.ok(enderecoUseCase.findAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<EnderecoResponse> create(@Valid @RequestBody EnderecoRequest request) throws BusinessException {
        return ResponseEntity.ok(enderecoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<EnderecoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody EnderecoRequest request) throws BusinessException {
        return ResponseEntity.ok(enderecoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        enderecoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Endereco excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<EnderecoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(enderecoUseCase.get(id));
    }
}