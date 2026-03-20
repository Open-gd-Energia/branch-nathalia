package br.com.opengd.usecase;

import br.com.opengd.controller.request.AlocacaoItemRequest;
import br.com.opengd.controller.response.AlocacaoItemResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface AlocacaoItemUseCase {
    AlocacaoItemResponse create(Long idAlocacao, AlocacaoItemRequest request) throws BusinessException;

    List<AlocacaoItemResponse> findByAttributes(Map<String, String> params);

    AlocacaoItemResponse update(Long idAlocacao, Long idConsumidor, AlocacaoItemRequest request) throws BusinessException;

    Boolean delete(Long idAlocacao, Long idConsumidor) throws BusinessException;

    AlocacaoItemResponse get(Long idAlocacao, Long idConsumidor) throws BusinessException;
}
