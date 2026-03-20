package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.ParametroMapper;
import br.com.opengd.controller.request.ParametroRequest;
import br.com.opengd.controller.response.ParametroResponse;
import br.com.opengd.entity.Parametro;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.ParametroRepository;
import br.com.opengd.usecase.ParametroUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParametroUseCaseImpl implements ParametroUseCase {

    @Autowired
    ParametroRepository parametroRepository;

    @Autowired
    ParametroMapper parametroMapper;

    @Override
    public ParametroResponse create(ParametroRequest request) throws BusinessException {
        validateDuplicate(null, request.getChave());
        Parametro save = parametroMapper.toEntity(request);
        return parametroMapper.toResponse(parametroRepository.save(save));
    }

    @Override
    public ParametroResponse update(String chave, ParametroRequest request) throws BusinessException {
        Parametro save = parametroRepository.findById(chave).orElseThrow(() -> new BusinessException("Parametro não encontrado!"));
        validateDuplicate(save, chave);
        save.setValor(request.getValor());
        return parametroMapper.toResponse(parametroRepository.save(save));
    }

    @Override
    public Boolean delete(String chave) throws BusinessException {
        Optional<Parametro> perfilOptional = parametroRepository.findById(chave);
        if (perfilOptional.isPresent()) {
            try {
                parametroRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Parametro em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Parametro não encontrado!");
        }
    }

    @Override
    public ParametroResponse get(String chave) throws BusinessException {
        Optional<Parametro> objOptional = parametroRepository.findById(chave);
        if (objOptional.isPresent()) {
            return parametroMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Parametro não encontrado!");
        }
    }

    private void validateDuplicate(Parametro save, String chave) throws BusinessException {
        Optional<Parametro> objOptional = parametroRepository.findById(chave);
        if (objOptional.isPresent()) {
            if (save == null || !save.getChave().equals(objOptional.get().getChave())) {
                throw new BusinessException("Parametro com esta chave já existe!");
            }
        }
    }
}
