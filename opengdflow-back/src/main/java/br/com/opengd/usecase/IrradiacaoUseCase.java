package br.com.opengd.usecase;

import br.com.opengd.controller.request.IrradiacaoRequest;
import br.com.opengd.controller.response.IrradiacaoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface IrradiacaoUseCase {
    IrradiacaoResponse create(IrradiacaoRequest request) throws BusinessException;

    List<IrradiacaoResponse> findByAttributes(Map<String, String> params);

    IrradiacaoResponse update(Long id, IrradiacaoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    IrradiacaoResponse get(Long id) throws BusinessException;
}
