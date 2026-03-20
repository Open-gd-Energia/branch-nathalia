package br.com.opengd.usecase;

import br.com.opengd.controller.response.DashboardEnergiaGeradaConsumidaResponse;
import br.com.opengd.controller.response.DashboardResumoGeralResponse;
import br.com.opengd.controller.response.DashboardTitulosUsinaConsumidorResponse;
import br.com.opengd.exception.BusinessException;

import java.time.LocalDate;
import java.util.List;

public interface DashboardUseCase {
    DashboardResumoGeralResponse getResumoGeral() throws BusinessException;

    List<DashboardEnergiaGeradaConsumidaResponse> getEnergiaGeradaVsConsumida(LocalDate dataInicial, LocalDate dataFinal) throws BusinessException;

    List<DashboardTitulosUsinaConsumidorResponse> getTitulosUsinaVsConsumidor(String status) throws BusinessException;
}
