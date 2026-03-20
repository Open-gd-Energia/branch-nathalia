package br.com.opengd.usecase;

import br.com.opengd.controller.request.PerfilPermissoesRequest;
import br.com.opengd.controller.request.PerfilRequest;
import br.com.opengd.controller.response.PerfilPermissoesResponse;
import br.com.opengd.controller.response.PerfilResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;

public interface PerfilUseCase {
    List<PerfilResponse> list();

    PerfilResponse create(PerfilRequest request) throws BusinessException;

    PerfilResponse update(Long id, PerfilRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    PerfilResponse get(Long id) throws BusinessException;

    PerfilPermissoesResponse getPermissoes(Long id) throws BusinessException;

    PerfilPermissoesResponse putPermissoes(Long id, PerfilPermissoesRequest request) throws BusinessException;
}
