package br.com.opengd.usecase;

import br.com.opengd.controller.request.RegraTarifariaRequest;
import br.com.opengd.controller.response.RegraTarifariaResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface RegraTarifariaUseCase {
    RegraTarifariaResponse create(RegraTarifariaRequest request) throws BusinessException;

    List<RegraTarifariaResponse> findByAttributes(Map<String, String> params);

    RegraTarifariaResponse update(Long id, RegraTarifariaRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    RegraTarifariaResponse get(Long id) throws BusinessException;
}
