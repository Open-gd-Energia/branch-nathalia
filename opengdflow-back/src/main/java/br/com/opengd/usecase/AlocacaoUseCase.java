package br.com.opengd.usecase;

import br.com.opengd.controller.request.AlocacaoRequest;
import br.com.opengd.controller.response.AlocacaoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface AlocacaoUseCase {
    AlocacaoResponse create(AlocacaoRequest request) throws BusinessException;

    List<AlocacaoResponse> findByAttributes(Map<String, String> params);

    AlocacaoResponse update(Long id, AlocacaoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    AlocacaoResponse get(Long id) throws BusinessException;
}
