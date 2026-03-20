package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.BandeiraTarifariaMapper;
import br.com.opengd.controller.request.BandeiraTarifariaRequest;
import br.com.opengd.controller.response.BandeiraTarifariaResponse;
import br.com.opengd.entity.BandeiraTarifaria;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.BandeiraTarifariaRepository;
import br.com.opengd.usecase.BandeiraTarifariaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BandeiraTarifariaUseCaseImpl implements BandeiraTarifariaUseCase {

    @Autowired
    BandeiraTarifariaRepository bandeiraTarifariaRepository;

    @Autowired
    BandeiraTarifariaMapper bandeiraTarifariaMapper;

    @Override
    public BandeiraTarifariaResponse create(BandeiraTarifariaRequest request) throws BusinessException {
        validateDuplicate(null, request);
        BandeiraTarifaria save = bandeiraTarifariaMapper.toEntity(request);
        validate(save, request);
        return bandeiraTarifariaMapper.toResponse(bandeiraTarifariaRepository.save(save));
    }

    @Override
    public List<BandeiraTarifariaResponse> findByAttributes(Map<String, String> params) {
        return bandeiraTarifariaMapper.toResponseList(bandeiraTarifariaRepository.findByDynamicQuery(params));
    }

    @Override
    public BandeiraTarifariaResponse update(Long id, BandeiraTarifariaRequest request) throws BusinessException {
        BandeiraTarifaria save = bandeiraTarifariaRepository.findById(id).orElseThrow(() -> new BusinessException("Bandeira Tarifaria não encontrada!"));
        validateDuplicate(save, request);
        bandeiraTarifariaMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return bandeiraTarifariaMapper.toResponse(bandeiraTarifariaRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<BandeiraTarifaria> perfilOptional = bandeiraTarifariaRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                bandeiraTarifariaRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Bandeira Tarifaria em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Bandeira Tarifaria não encontrado!");
        }
    }

    @Override
    public BandeiraTarifariaResponse get(Long id) throws BusinessException {
        Optional<BandeiraTarifaria> objOptional = bandeiraTarifariaRepository.findById(id);
        if (objOptional.isPresent()) {
            return bandeiraTarifariaMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Bandeira Tarifaria não encontrada!");
        }
    }

    private void validate(BandeiraTarifaria save, BandeiraTarifariaRequest request) throws BusinessException {

    }

    private void validateDuplicate(BandeiraTarifaria save, BandeiraTarifariaRequest request) throws BusinessException {
        List<BandeiraTarifaria> findExist = bandeiraTarifariaRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Bandeira Tarifaria com este nome já existe!");
            }
        }
    }
}
