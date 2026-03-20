package br.com.opengd.controller;

import br.com.opengd.controller.request.ConsumidorRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.ConsumidorResponse;
import br.com.opengd.controller.response.EstatisticaFaturaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.ConsumidorUseCase;
import br.com.opengd.usecase.EstatisticaUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/consumidores")
@RequiredArgsConstructor
public class ConsumidorController {

    private final ConsumidorUseCase consumidorUseCase;
    private final EstatisticaUseCase estatisticaUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: uc, idDistribuidora, nome e status (ATIVO,INATIVO,AGUARDANDO_COMPENSACAO,AGUARDANDO_DOCUMENTOS,AGUARDANDO_GERADOR,PROTOCOLADO,ESGOTANDO_CREDITOS,EM_NEGOCIACAO)")
    public ResponseEntity<List<ConsumidorResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<ConsumidorResponse> responseList = consumidorUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<ConsumidorResponse> create(@Valid @RequestBody ConsumidorRequest request) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<ConsumidorResponse> update(@PathVariable("id") Long id, @Valid @RequestBody ConsumidorRequest request) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        consumidorUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Consumidor desativado com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<ConsumidorResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(consumidorUseCase.get(id));
    }

    @GetMapping("/{id}/estatisticasFatura")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<EstatisticaFaturaResponse> getEstatisticaFatura(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(estatisticaUseCase.getEstatisticaFaturaConsumidor(id));
    }
}