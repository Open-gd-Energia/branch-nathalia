package br.com.opengd.usecase;

import br.com.opengd.controller.request.TituloRequest;
import br.com.opengd.controller.response.TituloResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface TituloUseCase {
    TituloResponse create(TituloRequest request) throws BusinessException;

    List<TituloResponse> findByAttributes(Map<String, String> params);

    TituloResponse update(Long id, TituloRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    TituloResponse get(Long id) throws BusinessException;

    TituloResponse emitirBoleto(Long id) throws BusinessException;
}
