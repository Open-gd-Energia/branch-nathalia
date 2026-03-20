package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.GeracaoMapper;
import br.com.opengd.controller.request.GeracaoRequest;
import br.com.opengd.controller.response.GeracaoResponse;
import br.com.opengd.entity.Geracao;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.GeracaoRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.GeracaoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GeracaoUseCaseImpl implements GeracaoUseCase {

    @Autowired
    GeracaoRepository geracaoRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    GeracaoMapper geracaoMapper;

    @Override
    public GeracaoResponse create(GeracaoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Geracao save = geracaoMapper.toEntity(request);
        validate(save, request);
        return geracaoMapper.toResponse(geracaoRepository.save(save));
    }

    @Override
    public List<GeracaoResponse> findByAttributes(Map<String, String> params) {
        return geracaoMapper.toResponseList(geracaoRepository.findByDynamicQuery(params));
    }

    @Override
    public GeracaoResponse update(Long id, GeracaoRequest request) throws BusinessException {
        Geracao save = geracaoRepository.findById(id).orElseThrow(() -> new BusinessException("Geração não encontrada!"));
        validateDuplicate(save, request);
        geracaoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return geracaoMapper.toResponse(geracaoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Geracao> perfilOptional = geracaoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                geracaoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Geração em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Geração não encontrado!");
        }
    }

    @Override
    public GeracaoResponse get(Long id) throws BusinessException {
        Optional<Geracao> objOptional = geracaoRepository.findById(id);
        if (objOptional.isPresent()) {
            return geracaoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Geração não encontrado!");
        }
    }


    private void validate(Geracao save, GeracaoRequest request) throws BusinessException {
        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }
    }

    private void validateDuplicate(Geracao save, GeracaoRequest request) throws BusinessException {

    }
}
