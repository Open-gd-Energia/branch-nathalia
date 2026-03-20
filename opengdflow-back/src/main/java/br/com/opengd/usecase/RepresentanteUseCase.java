package br.com.opengd.usecase;

import br.com.opengd.controller.request.RepresentanteRequest;
import br.com.opengd.controller.response.RepresentanteResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface RepresentanteUseCase {
    RepresentanteResponse create(RepresentanteRequest request) throws BusinessException;

    List<RepresentanteResponse> findByAttributes(Map<String, String> params);

    RepresentanteResponse update(Long id, RepresentanteRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    RepresentanteResponse get(Long id) throws BusinessException;
}
