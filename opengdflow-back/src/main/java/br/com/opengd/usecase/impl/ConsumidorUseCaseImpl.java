package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.ConsumidorMapper;
import br.com.opengd.controller.request.ConsumidorRepresentanteRequest;
import br.com.opengd.controller.request.ConsumidorRequest;
import br.com.opengd.controller.response.ConsumidorResponse;
import br.com.opengd.entity.Cidade;
import br.com.opengd.entity.Consumidor;
import br.com.opengd.entity.Distribuidora;
import br.com.opengd.entity.Representante;
import br.com.opengd.enums.ConsumidorStatus;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.CidadeRepository;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.DistribuidoraRepository;
import br.com.opengd.repository.RepresentanteRepository;
import br.com.opengd.usecase.CidadeUseCase;
import br.com.opengd.usecase.ConsumidorUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ConsumidorUseCaseImpl implements ConsumidorUseCase {

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    CidadeRepository cidadeRepository;

    @Autowired
    DistribuidoraRepository distribuidoraRepository;

    @Autowired
    RepresentanteRepository representanteRepository;

    @Autowired
    ConsumidorMapper consumidorMapper;

    private final CidadeUseCase cidadeUseCase;

    public ConsumidorUseCaseImpl(CidadeUseCase cidadeUseCase) {
        this.cidadeUseCase = cidadeUseCase;
    }

    @Override
    public ConsumidorResponse create(ConsumidorRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Consumidor save = consumidorMapper.toEntity(request);
        validate(save, request);
        return consumidorMapper.toResponse(consumidorRepository.save(save));
    }

    @Override
    public List<ConsumidorResponse> findByAttributes(Map<String, String> params) {
        return consumidorMapper.toResponseList(consumidorRepository.findByDynamicQuery(params));
    }

    @Override
    public ConsumidorResponse update(Long id, ConsumidorRequest request) throws BusinessException {
        Consumidor save = consumidorRepository.findById(id).orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
        validateDuplicate(save, request);
        consumidorMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return consumidorMapper.toResponse(consumidorRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Consumidor> objOptional = consumidorRepository.findById(id);
        if (objOptional.isPresent()) {
            Consumidor obj = objOptional.get();
            obj.setStatus(ConsumidorStatus.INATIVO);
            consumidorRepository.save(obj);
            return true;
        } else {
            throw new BusinessException("Consumidor não encontrado!");
        }
    }

    @Override
    public ConsumidorResponse get(Long id) throws BusinessException {
        Optional<Consumidor> objOptional = consumidorRepository.findById(id);
        if (objOptional.isPresent()) {
            return consumidorMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Consumidor não encontrado!");
        }
    }

    private void validate(Consumidor save, ConsumidorRequest request) throws BusinessException {
        if (request.getEndereco() != null && request.getEndereco().getCidade() != null && request.getEndereco().getCidade().getIdIbge() != null) {
            Cidade cidade = cidadeUseCase.findOrCreate(request.getEndereco().getCidade());
            save.getEndereco().setCidade(cidade);
        }

        if (request.getDistribuidora() != null && request.getDistribuidora().getId() != null) {
            Distribuidora distribuidora = distribuidoraRepository.findById(request.getDistribuidora().getId()).orElseThrow(() -> new BusinessException("Distribuidora não encontrada!"));
            save.setDistribuidora(distribuidora);
        }

        if (request.getRepresentanteTitular() != null && request.getRepresentanteTitular().getId() != null) {
            Representante representante = representanteRepository.findById(request.getRepresentanteTitular().getId()).orElseThrow(() -> new BusinessException("Representante não encontrado!"));
            save.setRepresentanteTitular(representante);
        }

        if (save.getRepresentantes() != null) save.getRepresentantes().clear();
        if (request.getRepresentantes() != null && !request.getRepresentantes().isEmpty()) {
            for (ConsumidorRepresentanteRequest representanteRequest : request.getRepresentantes()) {
                Representante representante = representanteRepository.findById(representanteRequest.getRepresentante().getId()).orElseThrow(() -> new BusinessException("Representante não encontrado!"));
                save.adicionarRepresentante(representante, representanteRequest.getRelacao());
            }
        }
    }

    private void validateDuplicate(Consumidor save, ConsumidorRequest request) throws BusinessException {

    }
}
