package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.DistribuidoraMapper;
import br.com.opengd.controller.request.DistribuidoraRequest;
import br.com.opengd.controller.response.DistribuidoraResponse;
import br.com.opengd.entity.Distribuidora;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.DistribuidoraRepository;
import br.com.opengd.usecase.DistribuidoraUseCase;
import br.com.opengd.utils.UtilsOpenGD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DistribuidoraUseCaseImpl implements DistribuidoraUseCase {

    @Autowired
    DistribuidoraRepository distribuidoraRepository;

    @Autowired
    DistribuidoraMapper distribuidoraMapper;

    @Override
    public DistribuidoraResponse create(DistribuidoraRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Distribuidora save = distribuidoraMapper.toEntity(request);
        validate(save, request);
        return distribuidoraMapper.toResponse(distribuidoraRepository.save(save));
    }

    @Override
    public List<DistribuidoraResponse> findByAttributes(Map<String, String> params) {
        return distribuidoraMapper.toResponseList(distribuidoraRepository.findByDynamicQuery(params));
    }

    @Override
    public DistribuidoraResponse update(Long id, DistribuidoraRequest request) throws BusinessException {
        Distribuidora save = distribuidoraRepository.findById(id).orElseThrow(() -> new BusinessException("Distribuidora não encontrada!"));
        validateDuplicate(save, request);
        distribuidoraMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return distribuidoraMapper.toResponse(distribuidoraRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Distribuidora> objOptional = distribuidoraRepository.findById(id);
        if (objOptional.isPresent()) {
            Distribuidora obj = objOptional.get();
            obj.setStatus(0L);
            distribuidoraRepository.save(obj);
            return true;
        } else {
            throw new BusinessException("Distribuidora não encontrada!");
        }
    }

    @Override
    public DistribuidoraResponse get(Long id) throws BusinessException {
        Optional<Distribuidora> objOptional = distribuidoraRepository.findById(id);
        if (objOptional.isPresent()) {
            return distribuidoraMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Distribuidora não encontrada!");
        }
    }

    @Override
    public Distribuidora getDistribuidoraByCnpjOrName(String cnpj, String nome) throws BusinessException {
        List<Distribuidora> distribuidoraList = distribuidoraRepository.findByCnpj(UtilsOpenGD.apenasNumeros(cnpj));
        if (distribuidoraList != null && !distribuidoraList.isEmpty()) {
            return distribuidoraList.getFirst();
        }
        distribuidoraList = distribuidoraRepository.findByNome(nome);
        if (distribuidoraList != null && !distribuidoraList.isEmpty()) {
            return distribuidoraList.getFirst();
        }
        return null;
    }

    private void validate(Distribuidora save, DistribuidoraRequest request) throws BusinessException {

    }

    private void validateDuplicate(Distribuidora save, DistribuidoraRequest request) throws BusinessException {
        List<Distribuidora> findExist = distribuidoraRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Distribuidora com este nome já existe!");
            }
        }
    }
}
