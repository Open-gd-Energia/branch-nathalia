package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.IrradiacaoMapper;
import br.com.opengd.controller.request.IrradiacaoRequest;
import br.com.opengd.controller.response.IrradiacaoResponse;
import br.com.opengd.entity.Irradiacao;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.IrradiacaoRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.IrradiacaoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IrradiacaoUseCaseImpl implements IrradiacaoUseCase {

    @Autowired
    IrradiacaoRepository irradiacaoRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    IrradiacaoMapper irradiacaoMapper;

    @Override
    public IrradiacaoResponse create(IrradiacaoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Irradiacao save = irradiacaoMapper.toEntity(request);
        validate(save, request);
        return irradiacaoMapper.toResponse(irradiacaoRepository.save(save));
    }

    @Override
    public List<IrradiacaoResponse> findByAttributes(Map<String, String> params) {
        return irradiacaoMapper.toResponseList(irradiacaoRepository.findByDynamicQuery(params));
    }

    @Override
    public IrradiacaoResponse update(Long id, IrradiacaoRequest request) throws BusinessException {
        Irradiacao save = irradiacaoRepository.findById(id).orElseThrow(() -> new BusinessException("Irradiacao não encontrado!"));
        validateDuplicate(save, request);
        irradiacaoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return irradiacaoMapper.toResponse(irradiacaoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Irradiacao> perfilOptional = irradiacaoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                irradiacaoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Irradiacao em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Irradiacao não encontrado!");
        }
    }

    @Override
    public IrradiacaoResponse get(Long id) throws BusinessException {
        Optional<Irradiacao> objOptional = irradiacaoRepository.findById(id);
        if (objOptional.isPresent()) {
            return irradiacaoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Irradiacao não encontrado!");
        }
    }


    private void validate(Irradiacao save, IrradiacaoRequest request) throws BusinessException {
        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }
    }

    private void validateDuplicate(Irradiacao save, IrradiacaoRequest request) throws BusinessException {

    }
}
