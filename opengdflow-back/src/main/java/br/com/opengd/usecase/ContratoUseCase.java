package br.com.opengd.usecase;

import br.com.opengd.controller.request.ContratoRequest;
import br.com.opengd.controller.response.ContratoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface ContratoUseCase {
    ContratoResponse create(ContratoRequest request) throws BusinessException;

    List<ContratoResponse> findByAttributes(Map<String, String> params);

    ContratoResponse update(Long id, ContratoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    ContratoResponse get(Long id) throws BusinessException;
}
