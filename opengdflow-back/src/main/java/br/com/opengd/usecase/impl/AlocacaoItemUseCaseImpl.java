package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.AlocacaoItemMapper;
import br.com.opengd.controller.request.AlocacaoItemRequest;
import br.com.opengd.controller.request.IdRequest;
import br.com.opengd.controller.response.AlocacaoItemResponse;
import br.com.opengd.entity.Alocacao;
import br.com.opengd.entity.AlocacaoItem;
import br.com.opengd.entity.AlocacaoItemId;
import br.com.opengd.entity.Consumidor;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.AlocacaoItemRepository;
import br.com.opengd.repository.AlocacaoRepository;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.usecase.AlocacaoItemUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AlocacaoItemUseCaseImpl implements AlocacaoItemUseCase {

    @Autowired
    AlocacaoItemRepository alocacaoItemRepository;

    @Autowired
    AlocacaoRepository alocacaoRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    AlocacaoItemMapper alocacaoItemMapper;

    @Override
    public AlocacaoItemResponse create(Long idAlocacao, AlocacaoItemRequest request) throws BusinessException {
        validateDuplicate(null, idAlocacao, request);
        AlocacaoItem save = alocacaoItemMapper.toEntity(request);
        validate(save, idAlocacao, request);
        return alocacaoItemMapper.toResponse(alocacaoItemRepository.save(save));
    }

    @Override
    public List<AlocacaoItemResponse> findByAttributes(Map<String, String> params) {
        return alocacaoItemMapper.toResponseList(alocacaoItemRepository.findByDynamicQuery(params));
    }

    @Override
    public AlocacaoItemResponse update(Long idAlocacao, Long idConsumidor, AlocacaoItemRequest request) throws BusinessException {
        AlocacaoItemId id = new AlocacaoItemId(idAlocacao, idConsumidor);
        AlocacaoItem save = alocacaoItemRepository.findById(id).orElseThrow(() -> new BusinessException("AlocaçãoItem não encontrada!"));
        request.setConsumidor(new IdRequest(idConsumidor));
        //validateDuplicate(save, idAlocacao, request);
        alocacaoItemMapper.updateEntityFromDto(request, save);
        validate(save, idAlocacao, request);
        return alocacaoItemMapper.toResponse(alocacaoItemRepository.save(save));
    }

    @Override
    public Boolean delete(Long idAlocacao, Long idConsumidor) throws BusinessException {
        AlocacaoItemId id = new AlocacaoItemId(idAlocacao, idConsumidor);
        Optional<AlocacaoItem> perfilOptional = alocacaoItemRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                alocacaoItemRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("AlocaçãoItem em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("AlocaçãoItem não encontrada!");
        }
    }

    @Override
    public AlocacaoItemResponse get(Long idAlocacao, Long idConsumidor) throws BusinessException {
        AlocacaoItemId id = new AlocacaoItemId(idAlocacao, idConsumidor);
        Optional<AlocacaoItem> objOptional = alocacaoItemRepository.findById(id);
        if (objOptional.isPresent()) {
            return alocacaoItemMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("AlocaçãoItem não encontrada!");
        }
    }

    private void validate(AlocacaoItem save, Long idAlocacao, AlocacaoItemRequest request) throws BusinessException {
        if (idAlocacao != null) {
            Alocacao alocacao = alocacaoRepository.findById(idAlocacao).orElseThrow(() -> new BusinessException("Alocação não encontrado!"));
            save.setAlocacao(alocacao);
        }

        if (request.getConsumidor() != null && request.getConsumidor().getId() != null) {
            Consumidor consumidor = consumidorRepository.findById(request.getConsumidor().getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
            save.setConsumidor(consumidor);
        }

        if ((save.getAlocacao() == null) || (save.getConsumidor() == null)) {
            throw new BusinessException("Alocação e Consumidor são obrigatórios!");
        }

        save.setId(new AlocacaoItemId(save.getAlocacao().getId(), save.getConsumidor().getId()));
    }

    private void validateDuplicate(AlocacaoItem save, Long idAlocacao, AlocacaoItemRequest request) throws BusinessException {
        AlocacaoItemId id = new AlocacaoItemId(idAlocacao, request.getConsumidor().getId());
        Optional<AlocacaoItem> findExist = alocacaoItemRepository.findById(id);
        if (findExist.isPresent()) {
            if (save == null || !save.getId().equals(id)) {
                throw new BusinessException("AlocaçãoItem já existe para o consumidor " + request.getConsumidor().getId() + " na alocação " + idAlocacao + "!");
            }
        }
    }
}
