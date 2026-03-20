package br.com.opengd.usecase;

import br.com.opengd.controller.request.TipoDescontoRequest;
import br.com.opengd.controller.response.TipoDescontoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface TipoDescontoUseCase {
    TipoDescontoResponse create(TipoDescontoRequest request) throws BusinessException;

    List<TipoDescontoResponse> findByAttributes(Map<String, String> params);

    TipoDescontoResponse update(Long id, TipoDescontoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    TipoDescontoResponse get(Long id) throws BusinessException;
}
