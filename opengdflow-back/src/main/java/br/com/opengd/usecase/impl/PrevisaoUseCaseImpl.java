package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.PrevisaoMapper;
import br.com.opengd.controller.request.PrevisaoRequest;
import br.com.opengd.controller.response.PrevisaoResponse;
import br.com.opengd.entity.Previsao;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.PrevisaoRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.PrevisaoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PrevisaoUseCaseImpl implements PrevisaoUseCase {

    @Autowired
    PrevisaoRepository previsaoRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    PrevisaoMapper previsaoMapper;

    @Override
    public PrevisaoResponse create(PrevisaoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Previsao save = previsaoMapper.toEntity(request);
        validate(save, request);
        return previsaoMapper.toResponse(previsaoRepository.save(save));
    }

    @Override
    public List<PrevisaoResponse> findByAttributes(Map<String, String> params) {
        return previsaoMapper.toResponseList(previsaoRepository.findByDynamicQuery(params));
    }

    @Override
    public PrevisaoResponse update(Long id, PrevisaoRequest request) throws BusinessException {
        Previsao save = previsaoRepository.findById(id).orElseThrow(() -> new BusinessException("Previsão não encontrada!"));
        validateDuplicate(save, request);
        previsaoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return previsaoMapper.toResponse(previsaoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Previsao> perfilOptional = previsaoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                previsaoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Previsão em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Previsão não encontrado!");
        }
    }

    @Override
    public PrevisaoResponse get(Long id) throws BusinessException {
        Optional<Previsao> objOptional = previsaoRepository.findById(id);
        if (objOptional.isPresent()) {
            return previsaoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Previsão não encontrado!");
        }
    }


    private void validate(Previsao save, PrevisaoRequest request) throws BusinessException {
        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }
    }

    private void validateDuplicate(Previsao save, PrevisaoRequest request) throws BusinessException {

    }
}
