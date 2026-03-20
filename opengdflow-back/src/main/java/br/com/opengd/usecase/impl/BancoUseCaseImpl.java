package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.BancoMapper;
import br.com.opengd.controller.request.BancoRequest;
import br.com.opengd.controller.response.BancoResponse;
import br.com.opengd.entity.Banco;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.BancoRepository;
import br.com.opengd.usecase.BancoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BancoUseCaseImpl implements BancoUseCase {

    @Autowired
    BancoRepository bancoRepository;

    @Autowired
    BancoMapper bancoMapper;

    @Override
    public BancoResponse create(BancoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Banco save = bancoMapper.toEntity(request);
        return bancoMapper.toResponse(bancoRepository.save(save));
    }

    @Override
    public List<BancoResponse> findByAttributes(Map<String, String> params) {
        return bancoMapper.toResponseList(bancoRepository.findByDynamicQuery(params));
    }

    @Override
    public BancoResponse update(Long id, BancoRequest request) throws BusinessException {
        Banco save = bancoRepository.findById(id).orElseThrow(() -> new BusinessException("Banco não encontrado!"));
        validateDuplicate(save, request);
        bancoMapper.updateEntityFromDto(request, save);
        return bancoMapper.toResponse(bancoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Banco> perfilOptional = bancoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                bancoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Banco em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Banco não encontrado!");
        }
    }

    @Override
    public BancoResponse get(Long id) throws BusinessException {
        Optional<Banco> objOptional = bancoRepository.findById(id);
        if (objOptional.isPresent()) {
            return bancoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Banco não encontrado!");
        }
    }

    private void validateDuplicate(Banco save, BancoRequest request) throws BusinessException {
        List<Banco> findExist = bancoRepository.findByNome(request.getNome());
        if ((findExist != null) && (!findExist.isEmpty())) {
            if (save == null || !save.getId().equals(findExist.getFirst().getId())) {
                throw new BusinessException("Banco com este nome já existe!");
            }
        }
    }
}
