package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.FaturamentoTipoMapper;
import br.com.opengd.controller.request.FaturamentoTipoRequest;
import br.com.opengd.controller.response.FaturamentoTipoResponse;
import br.com.opengd.entity.FaturamentoTipo;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.FaturamentoTipoRepository;
import br.com.opengd.usecase.FaturamentoTipoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FaturamentoTipoUseCaseImpl implements FaturamentoTipoUseCase {

    @Autowired
    FaturamentoTipoRepository faturamentoTipoRepository;

    @Autowired
    FaturamentoTipoMapper faturamentoTipoMapper;

    @Override
    public FaturamentoTipoResponse create(FaturamentoTipoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        FaturamentoTipo save = faturamentoTipoMapper.toEntity(request);
        validate(save, request);
        return faturamentoTipoMapper.toResponse(faturamentoTipoRepository.save(save));
    }

    @Override
    public List<FaturamentoTipoResponse> findByAttributes(Map<String, String> params) {
        return faturamentoTipoMapper.toResponseList(faturamentoTipoRepository.findByDynamicQuery(params));
    }

    @Override
    public FaturamentoTipoResponse update(Long id, FaturamentoTipoRequest request) throws BusinessException {
        FaturamentoTipo save = faturamentoTipoRepository.findById(id).orElseThrow(() -> new BusinessException("Faturamento Tipo não encontrado!"));
        validateDuplicate(save, request);
        faturamentoTipoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return faturamentoTipoMapper.toResponse(faturamentoTipoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<FaturamentoTipo> perfilOptional = faturamentoTipoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                faturamentoTipoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Faturamento Tipo em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Faturamento Tipo não encontrado!");
        }
    }

    @Override
    public FaturamentoTipoResponse get(Long id) throws BusinessException {
        Optional<FaturamentoTipo> objOptional = faturamentoTipoRepository.findById(id);
        if (objOptional.isPresent()) {
            return faturamentoTipoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Faturamento Tipo não encontrada!");
        }
    }


    private void validate(FaturamentoTipo save, FaturamentoTipoRequest request) throws BusinessException {

    }

    private void validateDuplicate(FaturamentoTipo save, FaturamentoTipoRequest request) throws BusinessException {
        List<FaturamentoTipo> findExist = faturamentoTipoRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Faturamento Tipo com este nome já existe!");
            }
        }
    }
}
