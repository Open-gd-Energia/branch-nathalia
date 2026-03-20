package br.com.opengd.controller;

import br.com.opengd.controller.request.UsuarioRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.UsuarioResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.UsuarioUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioUseCase usuarioUseCase;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, email, celular e status (0=Inativo, 1=Ativo)")
    public ResponseEntity<List<UsuarioResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(usuarioUseCase.findByAttributes(params));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<UsuarioResponse> create(@Valid @RequestBody UsuarioRequest user) throws BusinessException {
        return ResponseEntity.ok(usuarioUseCase.create(user));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<UsuarioResponse> update(@PathVariable("id") Long id, @Valid @RequestBody UsuarioRequest user) throws BusinessException {
        return ResponseEntity.ok(usuarioUseCase.update(id, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        usuarioUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Usuario desativado com sucesso!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN') or #id.toString() == authentication.principal.claims['sub']")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<UsuarioResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(usuarioUseCase.get(id));
    }

    @GetMapping("/usina/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar Usuarios por id da Usina")
    public ResponseEntity<List<UsuarioResponse>> getUsuariosUsina(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(usuarioUseCase.getUsuariosUsina(id));
    }
}