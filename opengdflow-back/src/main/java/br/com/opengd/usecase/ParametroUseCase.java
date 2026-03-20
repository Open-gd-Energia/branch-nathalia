package br.com.opengd.usecase;

import br.com.opengd.controller.request.ParametroRequest;
import br.com.opengd.controller.response.ParametroResponse;
import br.com.opengd.exception.BusinessException;

public interface ParametroUseCase {
    ParametroResponse create(ParametroRequest request) throws BusinessException;

    ParametroResponse update(String chave, ParametroRequest request) throws BusinessException;

    Boolean delete(String chave) throws BusinessException;

    ParametroResponse get(String chave) throws BusinessException;
}
