package br.com.opengd.usecase.impl;


import br.com.opengd.controller.mapper.PerfilMapper;
import br.com.opengd.controller.request.IdRequest;
import br.com.opengd.controller.request.PerfilPermissoesRequest;
import br.com.opengd.controller.request.PerfilRequest;
import br.com.opengd.controller.response.PerfilPermissoesResponse;
import br.com.opengd.controller.response.PerfilResponse;
import br.com.opengd.entity.Perfil;
import br.com.opengd.entity.Permissao;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.PerfilRepository;
import br.com.opengd.repository.PermissaoRepository;
import br.com.opengd.usecase.PerfilUseCase;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PerfilUseCaseImpl implements PerfilUseCase {

    @Autowired
    PerfilRepository perfilRepository;

    @Autowired
    PermissaoRepository permissaoRepository;

    @Autowired
    PerfilMapper perfilMapper;

    @Override
    public List<PerfilResponse> list() {
        List<Perfil> perfis = perfilRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
        // PerfilResponse inclui permissoes; inicializa coleção antes do mapeamento para evitar LazyInitializationException
        for (Perfil perfil : perfis) {
            Hibernate.initialize(perfil.getPermissoes());
        }
        return perfilMapper.toResponseList(perfis);
    }

    @Override
    public PerfilResponse create(PerfilRequest request) throws BusinessException {
        List<Perfil> perfilList = perfilRepository.findByNome(request.getNome());
        if ((perfilList != null) && (!perfilList.isEmpty())) {
            throw new BusinessException("Perfil com este nome já existe!");
        }

        Set<Permissao> permissoes = new HashSet<>();
        for (IdRequest permissao : request.getPermissoes()) {
            permissoes.add(permissaoRepository.findById(permissao.getId()).orElseThrow(() -> new BusinessException("Permissao não encontrada!")));
        }

        Perfil perfilSave = perfilMapper.toEntity(request);
        perfilSave.setPermissoes(permissoes);
        Perfil saved = perfilRepository.save(perfilSave);
        Hibernate.initialize(saved.getPermissoes());
        return perfilMapper.toResponse(saved);
    }

    @Override
    public PerfilResponse update(Long id, PerfilRequest request) throws BusinessException {
        Optional<Perfil> perfilOptional = perfilRepository.findById(id);
        if (perfilOptional.isPresent()) {
            Set<Permissao> permissoes = new HashSet<>();
            for (IdRequest permissao : request.getPermissoes()) {
                permissoes.add(permissaoRepository.findById(permissao.getId()).orElseThrow(() -> new BusinessException("Permissao não encontrada!")));
            }

            Perfil perfilSave = perfilOptional.get();
            perfilSave.setNome(request.getNome());
            perfilSave.setTipo(request.getTipo());
            perfilSave.setPermissoes(permissoes);
            Perfil saved = perfilRepository.save(perfilSave);
            Hibernate.initialize(saved.getPermissoes());
            return perfilMapper.toResponse(saved);
        } else {
            throw new BusinessException("Perfil não encontrado!");
        }
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Perfil> perfilOptional = perfilRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                perfilRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Perfil em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Perfil não encontrado!");
        }
    }

    @Override
    public PerfilResponse get(Long id) throws BusinessException {
        Optional<Perfil> perfilOptional = perfilRepository.findById(id);
        if (perfilOptional.isPresent()) {
            Perfil perfil = perfilOptional.get();
            Hibernate.initialize(perfil.getPermissoes());
            return perfilMapper.toResponse(perfil);
        } else {
            throw new BusinessException("Perfil não encontrado!");
        }
    }


    @Override
    public PerfilPermissoesResponse getPermissoes(Long id) throws BusinessException {
        Optional<Perfil> perfilOptional = perfilRepository.findById(id);
        if (perfilOptional.isPresent()) {
            Perfil perfil = perfilOptional.get();
            Hibernate.initialize(perfil.getPermissoes());
            return perfilMapper.toPerfilPermissaoResponse(perfil);
        } else {
            throw new BusinessException("Perfil não encontrado!");
        }
    }

    @Override
    public PerfilPermissoesResponse putPermissoes(Long id, PerfilPermissoesRequest request) throws BusinessException {
        Optional<Perfil> perfilOptional = perfilRepository.findById(id);
        if (perfilOptional.isPresent()) {
            Set<Permissao> permissoes = new HashSet<>();
            for (Long permissaoId : request.getPermissoes()) {
                Optional<Permissao> permissaoOptional = permissaoRepository.findById(permissaoId);
                if (permissaoOptional.isPresent()) {
                    permissoes.add(permissaoOptional.get());
                } else {
                    throw new BusinessException("Permissão não encontrada!");
                }
            }

            Perfil perfilSave = perfilOptional.get();
            perfilSave.setPermissoes(permissoes);
            Perfil saved = perfilRepository.save(perfilSave);
            Hibernate.initialize(saved.getPermissoes());
            return perfilMapper.toPerfilPermissaoResponse(saved);
        } else {
            throw new BusinessException("Perfil não encontrado!");
        }
    }
}
