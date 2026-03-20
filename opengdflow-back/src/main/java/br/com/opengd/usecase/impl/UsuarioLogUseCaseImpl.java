package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.UsuarioLogMapper;
import br.com.opengd.controller.request.UsuarioLogRequest;
import br.com.opengd.controller.response.UsuarioLogResponse;
import br.com.opengd.entity.Usuario;
import br.com.opengd.entity.UsuarioLog;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.UsuarioLogRepository;
import br.com.opengd.repository.UsuarioRepository;
import br.com.opengd.usecase.UsuarioLogUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UsuarioLogUseCaseImpl implements UsuarioLogUseCase {

    @Autowired
    UsuarioLogRepository usuarioLogRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    UsuarioLogMapper usuarioLogMapper;

    @Override
    public UsuarioLogResponse create(UsuarioLogRequest request) throws BusinessException {
        UsuarioLog save = usuarioLogMapper.toEntity(request);
        validate(save, request);
        return usuarioLogMapper.toResponse(usuarioLogRepository.save(save));
    }

    @Override
    public List<UsuarioLogResponse> findByAttributes(Map<String, String> params, Pageable pageable) {
        Page<UsuarioLog> usuarioLogPage = usuarioLogRepository.findByDynamicQuery(params, pageable);
        return usuarioLogMapper.toResponseList(usuarioLogPage.getContent());
    }


    private void validate(UsuarioLog save, UsuarioLogRequest request) throws BusinessException {
        if (request.getUsuario() != null && request.getUsuario().getId() != null) {
            Usuario usuario = usuarioRepository.findById(request.getUsuario().getId()).orElseThrow(() -> new BusinessException("Usuario não encontrado!"));
            save.setUsuario(usuario);
        }
    }
}
