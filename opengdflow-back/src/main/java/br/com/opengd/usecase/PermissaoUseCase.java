package br.com.opengd.usecase;

import br.com.opengd.controller.request.PermissaoRequest;
import br.com.opengd.controller.response.PermissaoResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;

public interface PermissaoUseCase {
    List<PermissaoResponse> list();

    PermissaoResponse create(PermissaoRequest permissao) throws BusinessException;

    PermissaoResponse update(Long id, PermissaoRequest permissao) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

}
