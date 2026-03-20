package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.ContratoMapper;
import br.com.opengd.controller.request.ContratoRequest;
import br.com.opengd.controller.response.ContratoResponse;
import br.com.opengd.entity.Contrato;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.ContratoRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.ContratoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ContratoUseCaseImpl implements ContratoUseCase {

    @Autowired
    ContratoRepository contratoRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    ContratoMapper contratoMapper;

    @Override
    public ContratoResponse create(ContratoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Contrato save = contratoMapper.toEntity(request);
        validate(save, request);
        return contratoMapper.toResponse(contratoRepository.save(save));
    }

    @Override
    public List<ContratoResponse> findByAttributes(Map<String, String> params) {
        return contratoMapper.toResponseList(contratoRepository.findByDynamicQuery(params));
    }

    @Override
    public ContratoResponse update(Long id, ContratoRequest request) throws BusinessException {
        Contrato save = contratoRepository.findById(id).orElseThrow(() -> new BusinessException("Contrato não encontrado!"));
        validateDuplicate(save, request);
        contratoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return contratoMapper.toResponse(contratoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Contrato> objOptional = contratoRepository.findById(id);
        if (objOptional.isPresent()) {
            Contrato obj = objOptional.get();
            obj.setStatus(0L);
            contratoRepository.save(obj);
            return true;
        } else {
            throw new BusinessException("Contrato não encontrado!");
        }
    }

    @Override
    public ContratoResponse get(Long id) throws BusinessException {
        Optional<Contrato> objOptional = contratoRepository.findById(id);
        if (objOptional.isPresent()) {
            return contratoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Contrato não encontrado!");
        }
    }

    private void validate(Contrato save, ContratoRequest request) throws BusinessException {
        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }

    }

    private void validateDuplicate(Contrato save, ContratoRequest request) throws BusinessException {

    }
}
