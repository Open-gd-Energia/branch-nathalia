package br.com.opengd.controller;

import br.com.opengd.controller.response.DashboardEnergiaGeradaConsumidaResponse;
import br.com.opengd.controller.response.DashboardResumoGeralResponse;
import br.com.opengd.controller.response.DashboardTitulosUsinaConsumidorResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.usecase.DashboardUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardUseCase dashboardUseCase;

    @GetMapping("/resumoGeral")
    @Operation(summary = "Dashboard", description = "Resumo geral")
    public ResponseEntity<DashboardResumoGeralResponse> getResumoGeral() throws BusinessException {
        DashboardResumoGeralResponse response = dashboardUseCase.getResumoGeral();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/energiaGeradaVsConsumida")
    @Operation(summary = "Dashboard", description = "Relatorio de energia gerada vs consumida")
    public ResponseEntity<List<DashboardEnergiaGeradaConsumidaResponse>> getEnergiaGeradaVsConsumida(@RequestParam Map<String, String> params) throws BusinessException {
        LocalDate dataInicial = params.containsKey("dataInicial") ? LocalDate.parse(params.get("dataInicial")) : null;
        LocalDate dataFinal = params.containsKey("dataFinal") ? LocalDate.parse(params.get("dataFinal")) : null;
        if (dataInicial == null || dataFinal == null) {
            throw new BusinessException("Parâmetros 'dataInicial' e 'dataFinal' são obrigatórios.");
        }
        List<DashboardEnergiaGeradaConsumidaResponse> responseList = dashboardUseCase.getEnergiaGeradaVsConsumida(dataInicial, dataFinal);
        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/titulosUsinaVsConsumidor")
    @Operation(summary = "Dashboard", description = "Relatorio de títulos usina vs consumidor! Obs: status = (VENCIDAS | A_VENCER)")
    public ResponseEntity<List<DashboardTitulosUsinaConsumidorResponse>> get(@RequestParam Map<String, String> params) throws BusinessException {
        String status = params.getOrDefault("status", null);
        if (status == null) {
            throw new BusinessException("Parâmetros 'status' é obrigatórios.");
        }
        if (!status.equals("VENCIDAS") && !status.equals("A_VENCER")) {
            throw new BusinessException("Parâmetros 'status' inválido. Valores aceitos: VENCIDAS, A_VENCER.");
        }
        List<DashboardTitulosUsinaConsumidorResponse> responseList = dashboardUseCase.getTitulosUsinaVsConsumidor(status);
        return ResponseEntity.ok(responseList);
    }
}