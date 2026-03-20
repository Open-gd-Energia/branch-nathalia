package br.com.opengd.controller;

import br.com.opengd.controller.request.UsinaRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.EstatisticaFaturaResponse;
import br.com.opengd.controller.response.EstatisticaGeracaoResponse;
import br.com.opengd.controller.response.UsinaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.EstatisticaUseCase;
import br.com.opengd.usecase.UsinaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usinas")
@RequiredArgsConstructor
public class UsinaController {

    private final UsinaUseCase usinaUseCase;
    private final EstatisticaUseCase estatisticaUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: nome, uc e status (ATIVO,INATIVO,EM_NEGOCIACAO,TROCANDO_TITULARIDADE)")
    public ResponseEntity<List<UsinaResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<UsinaResponse> responseList = usinaUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @Operation(summary = "Salvar um novo objeto")
    @PostMapping
    public ResponseEntity<UsinaResponse> create(@Valid @RequestBody UsinaRequest request) throws BusinessException {
        return ResponseEntity.ok(usinaUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<UsinaResponse> update(@PathVariable("id") Long id, @Valid @RequestBody UsinaRequest request) throws BusinessException {
        return ResponseEntity.ok(usinaUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        usinaUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Usina desativada com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<UsinaResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(usinaUseCase.get(id));
    }

    @GetMapping("/distribuidora/{id}")
    @Operation(summary = "Buscar um objetos por id da Distribuidora")
    public ResponseEntity<List<UsinaResponse>> getByIdDistribuidora(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(usinaUseCase.findByIdDistribuidora(id));
    }

    @GetMapping("/representante/{id}")
    @Operation(summary = "Buscar um objetos por id do Representante")
    public ResponseEntity<List<UsinaResponse>> getByIdUsuario(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(usinaUseCase.findByIdRepresentante(id));
    }

    @GetMapping("/{id}/estatisticasFatura")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<EstatisticaFaturaResponse> getEstatisticaFatura(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(estatisticaUseCase.getEstatisticaFaturaUsina(id));
    }

    @GetMapping("/{id}/estatisticasGeracao")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<EstatisticaGeracaoResponse> getEstatisticaGeracao(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(estatisticaUseCase.getEstatisticaGeracaoUsina(id));
    }
}