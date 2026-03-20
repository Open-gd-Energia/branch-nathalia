package br.com.opengd.controller;

import br.com.opengd.controller.request.TituloRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.TituloResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.TituloUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/titulos")
@RequiredArgsConstructor
public class TituloController {

    private final TituloUseCase tituloUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idTipoDescontoItem, idUsina, idConsumidor, identificador, tipo, referenciaInicial, referenciaFinal, status")
    public ResponseEntity<List<TituloResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<TituloResponse> responseList = tituloUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }


    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<TituloResponse> create(@Valid @RequestBody TituloRequest request) throws BusinessException {
        return ResponseEntity.ok(tituloUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<TituloResponse> update(@PathVariable("id") Long id, @Valid @RequestBody TituloRequest request) throws BusinessException {
        return ResponseEntity.ok(tituloUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        tituloUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Titulo excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<TituloResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(tituloUseCase.get(id));
    }

    @PostMapping("/{id}/emitirBoleto")
    @Operation(summary = "Emitir boleto de um novo objeto")
    public ResponseEntity<TituloResponse> create(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(tituloUseCase.emitirBoleto(id));
    }
}