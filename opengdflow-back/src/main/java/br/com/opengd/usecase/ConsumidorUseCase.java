package br.com.opengd.usecase;

import br.com.opengd.controller.request.ConsumidorRequest;
import br.com.opengd.controller.response.ConsumidorResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface ConsumidorUseCase {
    ConsumidorResponse create(ConsumidorRequest request) throws BusinessException;

    List<ConsumidorResponse> findByAttributes(Map<String, String> params);

    ConsumidorResponse update(Long id, ConsumidorRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    ConsumidorResponse get(Long id) throws BusinessException;
}
