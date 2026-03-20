package br.com.opengd.usecase;

import br.com.opengd.controller.request.PrevisaoRequest;
import br.com.opengd.controller.response.PrevisaoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface PrevisaoUseCase {
    PrevisaoResponse create(PrevisaoRequest request) throws BusinessException;

    List<PrevisaoResponse> findByAttributes(Map<String, String> params);

    PrevisaoResponse update(Long id, PrevisaoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    PrevisaoResponse get(Long id) throws BusinessException;
}
