package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.PermissaoMapper;
import br.com.opengd.controller.request.PermissaoRequest;
import br.com.opengd.controller.response.PermissaoResponse;
import br.com.opengd.entity.Permissao;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.PermissaoRepository;
import br.com.opengd.usecase.PermissaoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissaoUseCaseImpl implements PermissaoUseCase {

    @Autowired
    PermissaoMapper permissaoMapper;

    @Autowired
    PermissaoRepository permissaoRepository;

    @Override
    public List<PermissaoResponse> list() {
        return permissaoMapper.toResponseList(permissaoRepository.findAll(Sort.by(Sort.Direction.ASC, "nome")));
    }

    @Override
    public PermissaoResponse create(PermissaoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Permissao save = permissaoMapper.toEntity(request);
        validate(save, request);
        return permissaoMapper.toResponse(permissaoRepository.save(save));
    }

    @Override
    public PermissaoResponse update(Long id, PermissaoRequest request) throws BusinessException {
        Permissao save = permissaoRepository.findById(id).orElseThrow(() -> new BusinessException("Permissão não encontrada!"));
        validateDuplicate(save, request);
        permissaoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return permissaoMapper.toResponse(permissaoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Permissao> roleOptional = permissaoRepository.findById(id);
        if (roleOptional.isPresent()) {
            try {
                permissaoRepository.delete(roleOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Permissão em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Permissão não encontrada!");
        }
    }

    private void validate(Permissao save, PermissaoRequest request) throws BusinessException {

    }

    private void validateDuplicate(Permissao save, PermissaoRequest request) throws BusinessException {
        List<Permissao> findExist = permissaoRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Permissão com este nome já existe!");
            }
        }
    }
}
