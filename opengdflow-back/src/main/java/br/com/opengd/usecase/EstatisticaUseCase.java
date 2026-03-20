package br.com.opengd.usecase;

import br.com.opengd.controller.response.EstatisticaFaturaResponse;
import br.com.opengd.controller.response.EstatisticaGeracaoResponse;
import br.com.opengd.exception.BusinessException;

public interface EstatisticaUseCase {
    EstatisticaFaturaResponse getEstatisticaFaturaConsumidor(Long id) throws BusinessException;

    EstatisticaFaturaResponse getEstatisticaFaturaUsina(Long id) throws BusinessException;

    EstatisticaGeracaoResponse getEstatisticaGeracaoUsina(Long id) throws BusinessException;
}
