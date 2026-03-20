package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.RegraTarifariaMapper;
import br.com.opengd.controller.request.RegraTarifariaRequest;
import br.com.opengd.controller.response.RegraTarifariaResponse;
import br.com.opengd.entity.RegraTarifaria;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.RegraTarifariaRepository;
import br.com.opengd.usecase.RegraTarifariaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class RegraTarifariaUseCaseImpl implements RegraTarifariaUseCase {

    @Autowired
    RegraTarifariaRepository regraTarifariaRepository;

    @Autowired
    RegraTarifariaMapper regraTarifariaMapper;

    @Override
    public RegraTarifariaResponse create(RegraTarifariaRequest request) throws BusinessException {
        validateDuplicate(null, request);
        RegraTarifaria save = regraTarifariaMapper.toEntity(request);
        validate(save, request);
        return regraTarifariaMapper.toResponse(regraTarifariaRepository.save(save));
    }

    @Override
    public List<RegraTarifariaResponse> findByAttributes(Map<String, String> params) {
        return regraTarifariaMapper.toResponseList(regraTarifariaRepository.findByDynamicQuery(params));
    }

    @Override
    public RegraTarifariaResponse update(Long id, RegraTarifariaRequest request) throws BusinessException {
        RegraTarifaria save = regraTarifariaRepository.findById(id).orElseThrow(() -> new BusinessException("Regra Tarifaria não encontrada!"));
        validateDuplicate(save, request);
        regraTarifariaMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return regraTarifariaMapper.toResponse(regraTarifariaRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<RegraTarifaria> perfilOptional = regraTarifariaRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                regraTarifariaRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Regra Tarifaria em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Regra Tarifaria não encontrada!");
        }
    }

    @Override
    public RegraTarifariaResponse get(Long id) throws BusinessException {
        Optional<RegraTarifaria> objOptional = regraTarifariaRepository.findById(id);
        if (objOptional.isPresent()) {
            return regraTarifariaMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Regra Tarifaria não encontrado!");
        }
    }

    private void validate(RegraTarifaria save, RegraTarifariaRequest request) throws BusinessException {

    }

    private void validateDuplicate(RegraTarifaria save, RegraTarifariaRequest request) throws BusinessException {
        List<RegraTarifaria> findExist = regraTarifariaRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Regra Tarifaria com este nome já existe!");
            }
        }
    }
}
