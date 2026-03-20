package br.com.opengd.controller;

import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.fattureweb.dto.conteudo.DadosDTO;
import br.com.opengd.service.FattureWebService;
import br.com.opengd.usecase.FattureWebUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/fattureweb")
@RequiredArgsConstructor
public class FattureWebController {

    private final FattureWebService fattureWebService;
    private final FattureWebUseCase fattureWebUseCase;

    @PostMapping("/periodo")
    public ResponseEntity<List<FaturaResponse>> findByAttributes(@RequestParam("dataInicio") LocalDateTime dataInicio, @RequestParam("dataFim") LocalDateTime dataFim) throws BusinessException {
        List<FaturaResponse> response = fattureWebService.processarFaturas(dataInicio, dataFim);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/mapper")
    public ResponseEntity<FaturaRequest> mapper(@RequestBody DadosDTO dadosDTO) throws BusinessException {
        FaturaRequest response = fattureWebUseCase.mapearFaturaRequest(dadosDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/importar")
    public ResponseEntity<FaturaResponse> manual(@PathVariable("id") String id) throws BusinessException {
        FaturaResponse response = fattureWebService.processarFatura(id);
        return ResponseEntity.ok(response);
    }
}
