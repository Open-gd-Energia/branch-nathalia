package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.UsuarioMapper;
import br.com.opengd.controller.request.IdRequest;
import br.com.opengd.controller.request.UsuarioRequest;
import br.com.opengd.controller.request.UsuarioUsinaRequest;
import br.com.opengd.controller.response.UsuarioResponse;
import br.com.opengd.entity.*;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.PerfilRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.repository.UsuarioRepository;
import br.com.opengd.usecase.UsuarioUseCase;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class UsuarioUseCaseImpl implements UsuarioUseCase {
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    PerfilRepository perfilRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    UsuarioMapper usuarioMapper;

    @Override
    public List<UsuarioResponse> findByAttributes(Map<String, String> params) {
        // Compatibilidade incremental: aceita status textual semântico também (ATIVO/INATIVO)
        if (params != null && params.get("status") != null) {
            String rawStatus = params.get("status");
            try {
                Long parsed = br.com.opengd.utils.StatusAtivoInativoMapper.parseStatusAtivoInativoToLong(rawStatus);
                // Mantém o contrato legado do repository (status é bigint no banco)
                params.put("status", parsed == null ? null : parsed.toString());
            } catch (IllegalArgumentException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
            }
        }
        List<Usuario> usuarios = usuarioRepository.findByAttributes(params);
        // UsuarioResponse inclui PerfilResponse.permissoes; inicializa coleção (Perfil.permissoes agora é LAZY)
        for (Usuario usuario : usuarios) {
            if (usuario.getPerfil() != null) {
                Hibernate.initialize(usuario.getPerfil().getPermissoes());
            }
        }
        return usuarioMapper.toResponseList(usuarios);
    }

    @Override
    public UsuarioResponse create(UsuarioRequest request) throws BusinessException {
        Optional<Usuario> existUser = usuarioRepository.findByEmail(request.getEmail());

        if (existUser.isPresent()) {
            throw new BusinessException("Usuario com email " + request.getEmail() + " já existe!");
        }
        Usuario usuarioSave = usuarioMapper.toEntity(request);
        usuarioSave.setSenha(passwordEncoder().encode(request.getSenha()));

        if (request.getPerfil() != null) {
            Perfil perfil = perfilRepository.findById(request.getPerfil().getId()).orElseThrow(() -> new BusinessException("Perfil não encontrado!"));
            usuarioSave.setPerfil(perfil);
        }

        if (request.getUsinas() != null) {
            Set<UsuarioUsina> usinaSet = new HashSet<>();
            for (UsuarioUsinaRequest usuarioUsinaRequest : request.getUsinas()) {
                Usina usina = usinaRepository.findById(usuarioUsinaRequest.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
                UsuarioUsina usuarioUsina = new UsuarioUsina();
                usuarioUsina.setUsina(usina);
                usuarioUsina.setUsuario(usuarioSave);
                usuarioUsina.setProprietario(usuarioUsinaRequest.getProprietario());
                usinaSet.add(usuarioUsina);
            }
            usuarioSave.setUsinas(usinaSet);
        }

        if (request.getConsumidores() != null) {
            Set<Consumidor> consumidorSet = new HashSet<>();
            for (IdRequest consumidorId : request.getConsumidores()) {
                Consumidor consumidor = consumidorRepository.findById(consumidorId.getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
                consumidorSet.add(consumidor);
            }
            usuarioSave.setConsumidores(consumidorSet);
        }

        Usuario saved = usuarioRepository.save(usuarioSave);
        if (saved.getPerfil() != null) {
            Hibernate.initialize(saved.getPerfil().getPermissoes());
        }
        return usuarioMapper.toResponse(saved);
    }

    @Override
    public UsuarioResponse update(Long id, UsuarioRequest request) throws BusinessException {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Optional<Usuario> userEmail = usuarioRepository.findByEmail(request.getEmail());
            if (userEmail.isPresent()) {
                if (!userEmail.get().getId().equals(usuarioOptional.get().getId())) {
                    throw new BusinessException("Usuario com email " + request.getEmail() + " já existe!");
                }
            }
            Usuario usuarioSave = usuarioOptional.get();
            usuarioSave.setNome(request.getNome());
            usuarioSave.setCelular(request.getCelular());
            usuarioSave.setEmail(request.getEmail());
            usuarioSave.setUrlFoto(request.getUrlFoto());
            usuarioSave.setSexo(request.getSexo());
            usuarioSave.setDataNascimento(request.getDataNascimento());
            usuarioSave.setStatus(request.getStatus());

            if (request.getPerfil() != null) {
                Perfil perfil = perfilRepository.findById(request.getPerfil().getId()).orElseThrow(() -> new BusinessException("Perfil não encontrado!"));
                usuarioSave.setPerfil(perfil);
            } else {
                usuarioSave.setPerfil(null);
            }

            if (request.getSenha() == null || request.getSenha().isEmpty()) {
                usuarioSave.setSenha(usuarioOptional.get().getSenha());
            } else {
                usuarioSave.setSenha(passwordEncoder().encode(request.getSenha()));
            }

            if (request.getUsinas() != null) {
                Set<UsuarioUsina> usinaSet = new HashSet<>();
                for (UsuarioUsinaRequest usuarioUsinaRequest : request.getUsinas()) {
                    Usina usina = usinaRepository.findById(usuarioUsinaRequest.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
                    UsuarioUsina usuarioUsina = new UsuarioUsina();
                    usuarioUsina.setUsina(usina);
                    usuarioUsina.setUsuario(usuarioSave);
                    usuarioUsina.setProprietario(usuarioUsinaRequest.getProprietario());
                    usinaSet.add(usuarioUsina);
                }
                usuarioSave.setUsinas(usinaSet);
            } else {
                usuarioSave.setUsinas(null);
            }

            if (request.getConsumidores() != null) {
                Set<Consumidor> consumidorSet = new HashSet<>();
                for (IdRequest consumidorId : request.getConsumidores()) {
                    Consumidor consumidor = consumidorRepository.findById(consumidorId.getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
                    consumidorSet.add(consumidor);
                }
                usuarioSave.setConsumidores(consumidorSet);
            } else {
                usuarioSave.setConsumidores(null);
            }

            Usuario saved = usuarioRepository.save(usuarioSave);
            if (saved.getPerfil() != null) {
                Hibernate.initialize(saved.getPerfil().getPermissoes());
            }
            return usuarioMapper.toResponse(saved);
        } else {
            throw new BusinessException("Usuario não encontrado!");
        }
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setStatus(0L);
            usuarioRepository.save(usuario);
            return true;
        } else {
            throw new BusinessException("Usuario não encontrado!");
        }
    }

    @Override
    public UsuarioResponse get(Long id) throws BusinessException {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            Hibernate.initialize(usuario.getConsumidores());
            if (usuario.getPerfil() != null) {
                Hibernate.initialize(usuario.getPerfil().getPermissoes());
            }
            return usuarioMapper.toResponse(usuario);
        } else {
            throw new BusinessException("Usuario não encontrado!");
        }
    }

    @Override
    public List<UsuarioResponse> getUsuariosUsina(Long id) {
        List<Usuario> usuarios = usuarioRepository.findByUsinaId(id);
        // UsuarioResponse inclui PerfilResponse.permissoes; inicializa antes do mapeamento
        for (Usuario usuario : usuarios) {
            if (usuario.getPerfil() != null) {
                Hibernate.initialize(usuario.getPerfil().getPermissoes());
            }
        }
        return usuarioMapper.toResponseList(usuarios);
    }
}
