package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.CidadeMapper;
import br.com.opengd.controller.request.CidadeRequest;
import br.com.opengd.controller.response.CidadeResponse;
import br.com.opengd.entity.Cidade;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.CidadeRepository;
import br.com.opengd.usecase.CidadeUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CidadeUseCaseImpl implements CidadeUseCase {

    @Autowired
    CidadeRepository cidadeRepository;

    @Autowired
    CidadeMapper cidadeMapper;

    @Override
    public CidadeResponse create(CidadeRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Cidade save = cidadeMapper.toEntity(request);
        validate(save, request);
        return cidadeMapper.toResponse(cidadeRepository.save(save));
    }

    @Override
    public List<CidadeResponse> findByAttributes(Map<String, String> params) {
        return cidadeMapper.toResponseList(cidadeRepository.findByDynamicQuery(params));
    }

    @Override
    public CidadeResponse update(Long id, CidadeRequest request) throws BusinessException {
        Cidade save = cidadeRepository.findById(id).orElseThrow(() -> new BusinessException("Cidade não encontrada!"));
        validateDuplicate(save, request);
        cidadeMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return cidadeMapper.toResponse(cidadeRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Cidade> perfilOptional = cidadeRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                cidadeRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Cidade em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Cidade não encontrado!");
        }
    }

    @Override
    public CidadeResponse get(Long id) throws BusinessException {
        Optional<Cidade> objOptional = cidadeRepository.findById(id);
        if (objOptional.isPresent()) {
            return cidadeMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Cidade não encontrado!");
        }
    }


    private void validate(Cidade save, CidadeRequest request) throws BusinessException {

    }

    private void validateDuplicate(Cidade save, CidadeRequest request) throws BusinessException {
        Cidade findExist = cidadeRepository.findFirstByIdIbge(request.getIdIbge());
        if (findExist != null) {
            if (save == null || !save.getId().equals(findExist.getId())) {
                throw new BusinessException("Cidade com este idIbge já existe!");
            }
        }
    }

    @Override
    public Cidade findOrCreate(CidadeRequest request) {
        if (request != null && request.getIdIbge() != null) {
            Cidade cidadeList = cidadeRepository.findFirstByIdIbge(request.getIdIbge());
            if (cidadeList == null) {
                Cidade cidade = new Cidade();
                cidade.setIdIbge(request.getIdIbge());
                cidade.setNome(request.getNome());
                cidade.setUf(request.getUf());
                return cidadeRepository.save(cidade);
            } else {
                return cidadeList;
            }
        }
        return null;
    }
}
