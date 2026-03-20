package br.com.opengd.usecase;

import br.com.opengd.controller.request.UsinaRequest;
import br.com.opengd.controller.response.UsinaResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface UsinaUseCase {
    UsinaResponse create(UsinaRequest request) throws BusinessException;

    List<UsinaResponse> findByAttributes(Map<String, String> params);

    UsinaResponse update(Long id, UsinaRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    UsinaResponse get(Long id) throws BusinessException;

    List<UsinaResponse> findByIdDistribuidora(Long idDistribuidora);

    List<UsinaResponse> findByIdRepresentante(Long idUsuario);
}
