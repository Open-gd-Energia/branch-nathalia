package br.com.opengd.controller;

import br.com.opengd.controller.request.DocumentoRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.DocumentoFileResponse;
import br.com.opengd.controller.response.DocumentoResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.DocumentoUseCase;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/documentos")
@RequiredArgsConstructor
public class DocumentoController {

    private final DocumentoUseCase documentoUseCase;

    @GetMapping
    @Operation(summary = "Buscar por atributos dinâmicos", description = "Possibilidades de busca: idUsina, idConsumidor, idRepresentante, idUsuario,  dataInicial, dataFinal, tipo, descricao, nome")
    public ResponseEntity<List<DocumentoResponse>> findByAttributes(@RequestParam Map<String, String> params) {
        List<DocumentoResponse> responseList = documentoUseCase.findByAttributes(params);
        return ResponseEntity.ok(responseList);
    }

    @PostMapping
    @Operation(summary = "Salvar um novo objeto")
    public ResponseEntity<DocumentoResponse> create(@Valid @RequestBody DocumentoRequest request) throws BusinessException {
        return ResponseEntity.ok(documentoUseCase.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um objeto por id")
    public ResponseEntity<DocumentoResponse> update(@PathVariable("id") Long id, @Valid @RequestBody DocumentoRequest request) throws BusinessException {
        return ResponseEntity.ok(documentoUseCase.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um novo objeto por id")
    public ResponseEntity<BooleanResponse> delete(@PathVariable("id") Long id) throws BusinessException {
        documentoUseCase.delete(id);
        return ResponseEntity.ok(new BooleanResponse("Documento excluido com sucesso!"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um objeto por id")
    public ResponseEntity<DocumentoFileResponse> get(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(documentoUseCase.get(id));
    }
}