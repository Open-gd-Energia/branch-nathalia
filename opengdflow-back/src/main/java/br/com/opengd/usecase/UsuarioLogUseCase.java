package br.com.opengd.usecase;

import br.com.opengd.controller.request.UsuarioLogRequest;
import br.com.opengd.controller.response.UsuarioLogResponse;
import br.com.opengd.exception.BusinessException;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface UsuarioLogUseCase {
    UsuarioLogResponse create(UsuarioLogRequest request) throws BusinessException;

    List<UsuarioLogResponse> findByAttributes(Map<String, String> params, Pageable pageable);

    //UsuarioLogResponse get(Long id, Pageable pageable) throws BusinessException;
}
