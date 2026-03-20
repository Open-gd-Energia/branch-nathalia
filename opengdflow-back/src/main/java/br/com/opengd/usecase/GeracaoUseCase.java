package br.com.opengd.usecase;

import br.com.opengd.controller.request.GeracaoRequest;
import br.com.opengd.controller.response.GeracaoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface GeracaoUseCase {
    GeracaoResponse create(GeracaoRequest request) throws BusinessException;

    List<GeracaoResponse> findByAttributes(Map<String, String> params);

    GeracaoResponse update(Long id, GeracaoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    GeracaoResponse get(Long id) throws BusinessException;
}
