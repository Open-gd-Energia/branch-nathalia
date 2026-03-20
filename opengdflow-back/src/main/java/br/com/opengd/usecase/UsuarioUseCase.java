package br.com.opengd.usecase;

import br.com.opengd.controller.request.UsuarioRequest;
import br.com.opengd.controller.response.UsuarioResponse;
import br.com.opengd.exception.BusinessException;

import java.util.List;
import java.util.Map;

public interface UsuarioUseCase {
    UsuarioResponse create(UsuarioRequest request) throws BusinessException;

    List<UsuarioResponse> findByAttributes(Map<String, String> params);

    UsuarioResponse update(Long id, UsuarioRequest request) throws BusinessException;

    Boolean delete(Long id) throws BusinessException;

    UsuarioResponse get(Long id) throws BusinessException;

    List<UsuarioResponse> getUsuariosUsina(Long id);
}
