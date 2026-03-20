package br.com.opengd.usecase;

import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.fattureweb.dto.conteudo.DadosDTO;

public interface FattureWebUseCase {
    FaturaResponse processarFaturas(DadosDTO conteudoDTO) throws BusinessException;

    FaturaRequest mapearFaturaRequest(DadosDTO conteudoDTO) throws BusinessException;
}
