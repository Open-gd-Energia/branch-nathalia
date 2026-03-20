package br.com.opengd.usecase;

import br.com.opengd.controller.request.FaturamentoTipoRequest;
import br.com.opengd.controller.response.FaturamentoTipoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface FaturamentoTipoUseCase {
    FaturamentoTipoResponse create(FaturamentoTipoRequest request) throws BusinessException;

    List<FaturamentoTipoResponse> findByAttributes(Map<String, String> params);

    FaturamentoTipoResponse update(Long id, FaturamentoTipoRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    FaturamentoTipoResponse get(Long id) throws BusinessException;
}
