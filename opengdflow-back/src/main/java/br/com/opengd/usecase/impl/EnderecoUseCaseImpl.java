package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.EnderecoMapper;
import br.com.opengd.controller.request.EnderecoRequest;
import br.com.opengd.controller.response.EnderecoResponse;
import br.com.opengd.entity.Cidade;
import br.com.opengd.entity.Endereco;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.CidadeRepository;
import br.com.opengd.repository.EnderecoRepository;
import br.com.opengd.usecase.CidadeUseCase;
import br.com.opengd.usecase.EnderecoUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoUseCaseImpl implements EnderecoUseCase {

    @Autowired
    EnderecoRepository enderecoRepository;

    @Autowired
    CidadeRepository cidadeRepository;

    @Autowired
    EnderecoMapper enderecoMapper;

    private final CidadeUseCase cidadeUseCase;

    public EnderecoUseCaseImpl(CidadeUseCase cidadeUseCase) {
        this.cidadeUseCase = cidadeUseCase;
    }

    @Override
    public EnderecoResponse create(EnderecoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Endereco save = enderecoMapper.toEntity(request);
        validate(save, request);
        return enderecoMapper.toResponse(enderecoRepository.save(save));
    }

    @Override
    public List<EnderecoResponse> findAll() {
        return enderecoMapper.toResponseList(enderecoRepository.findAll());
    }

    @Override
    public EnderecoResponse update(Long id, EnderecoRequest request) throws BusinessException {
        Endereco save = enderecoRepository.findById(id).orElseThrow(() -> new BusinessException("Endereco não encontrado!"));
        validateDuplicate(save, request);
        enderecoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return enderecoMapper.toResponse(enderecoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Endereco> perfilOptional = enderecoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                enderecoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Endereco em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Endereco não encontrado!");
        }
    }

    @Override
    public EnderecoResponse get(Long id) throws BusinessException {
        Optional<Endereco> objOptional = enderecoRepository.findById(id);
        if (objOptional.isPresent()) {
            return enderecoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Endereco não encontrado!");
        }
    }


    private void validate(Endereco save, EnderecoRequest request) throws BusinessException {
        if (request.getCidade() != null && request.getCidade().getIdIbge() != null) {
            Cidade cidade = cidadeUseCase.findOrCreate(request.getCidade());
            save.setCidade(cidade);
        }
    }

    private void validateDuplicate(Endereco save, EnderecoRequest request) throws BusinessException {

    }
}
