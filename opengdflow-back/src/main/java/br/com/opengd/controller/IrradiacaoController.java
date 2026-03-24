package br.com.opengd.controller;

import br.com.opengd.controller.request.IrradiacaoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.IrradiacaoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.IrradiacaoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/irradiacoes")
@RequiredArgsConstructor
public class IrradiacaoController {

    private final IrradiacaoUseCase irradiacaoUseCase;


    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, ano, mes, dia")
    public ResponseEntity<List<IrradiacaoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(irradiacaoUseCase.findByAttributes(params));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<IrradiacaoResponse> create(@Valid @RequestBody IrradiacaoRequest request) throws BusinessException {
        return ResponseEntity.ok(irradiacaoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<IrradiacaoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody IrradiacaoRequest request) throws BusinessException {
        return ResponseEntity.ok(irradiacaoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        irradiacaoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Irradiacao excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<IrradiacaoResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(irradiacaoUseCase.get(id));
    }
}