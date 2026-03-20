package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.TipoDescontoMapper;
import br.com.opengd.controller.request.TipoDescontoRequest;
import br.com.opengd.controller.response.TipoDescontoResponse;
import br.com.opengd.entity.TipoDesconto;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.TipoDescontoRepository;
import br.com.opengd.usecase.TipoDescontoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TipoDescontoUseCaseImpl implements TipoDescontoUseCase {

    @Autowired
    TipoDescontoRepository tipoDescontoRepository;

    @Autowired
    TipoDescontoMapper tipoDescontoMapper;

    @Override
    public TipoDescontoResponse create(TipoDescontoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        TipoDesconto save = tipoDescontoMapper.toEntity(request);
        validate(save, request);
        return tipoDescontoMapper.toResponse(tipoDescontoRepository.save(save));
    }

    @Override
    public List<TipoDescontoResponse> findByAttributes(Map<String, String> params) {
        return tipoDescontoMapper.toResponseList(tipoDescontoRepository.findByDynamicQuery(params));
    }

    @Override
    public TipoDescontoResponse update(Long id, TipoDescontoRequest request) throws BusinessException {
        TipoDesconto save = tipoDescontoRepository.findById(id).orElseThrow(() -> new BusinessException("TipoDesconto não encontrada!"));
        validateDuplicate(save, request);
        tipoDescontoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return tipoDescontoMapper.toResponse(tipoDescontoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<TipoDesconto> perfilOptional = tipoDescontoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                tipoDescontoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("TipoDesconto em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("TipoDesconto não encontrado!");
        }
    }

    @Override
    public TipoDescontoResponse get(Long id) throws BusinessException {
        Optional<TipoDesconto> objOptional = tipoDescontoRepository.findById(id);
        if (objOptional.isPresent()) {
            return tipoDescontoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("TipoDesconto não encontrado!");
        }
    }


    private void validate(TipoDesconto save, TipoDescontoRequest request) throws BusinessException {
        if (save.getItens() != null) {
            save.getItens().forEach(item -> item.setTipoDesconto(save));
        }
    }

    private void validateDuplicate(TipoDesconto save, TipoDescontoRequest request) throws BusinessException {
        List<TipoDesconto> findExist = tipoDescontoRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("TipoDesconto com este nome já existe!");
            }
        }
    }
}
