package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.AlocacaoMapper;
import br.com.opengd.controller.request.AlocacaoItemRequest;
import br.com.opengd.controller.request.AlocacaoRequest;
import br.com.opengd.controller.response.AlocacaoResponse;
import br.com.opengd.entity.*;
import br.com.opengd.enums.AlocacaoStatus;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.AlocacaoItemRepository;
import br.com.opengd.repository.AlocacaoRepository;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.AlocacaoUseCase;
import br.com.opengd.usecase.CidadeUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AlocacaoUseCaseImpl implements AlocacaoUseCase {

    @Autowired
    AlocacaoRepository alocacaoRepository;

    @Autowired
    AlocacaoItemRepository alocacaoItemRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    AlocacaoMapper alocacaoMapper;

    private final CidadeUseCase cidadeUseCase;

    public AlocacaoUseCaseImpl(CidadeUseCase cidadeUseCase) {
        this.cidadeUseCase = cidadeUseCase;
    }

    @Override
    public AlocacaoResponse create(AlocacaoRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Alocacao save = alocacaoMapper.toEntity(request);
        validate(save, request);
        definirFimVigenciaByUsina(save.getUsina());
        return alocacaoMapper.toResponse(alocacaoRepository.save(save));
    }

    @Override
    public List<AlocacaoResponse> findByAttributes(Map<String, String> params) {
        return alocacaoMapper.toResponseList(alocacaoRepository.findByDynamicQuery(params));
    }

    @Override
    public AlocacaoResponse update(Long id, AlocacaoRequest request) throws BusinessException {
        Alocacao save = alocacaoRepository.findById(id).orElseThrow(() -> new BusinessException("Alocação não encontrada!"));
        validateDuplicate(save, request);
        alocacaoMapper.updateEntityFromDto(request, save);
        validate(save, request);
        definirFimVigenciaByUsina(save.getUsina());
        return alocacaoMapper.toResponse(alocacaoRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Alocacao> perfilOptional = alocacaoRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                alocacaoRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Alocação em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Alocação não encontrada!");
        }
    }

    @Override
    public AlocacaoResponse get(Long id) throws BusinessException {
        Optional<Alocacao> objOptional = alocacaoRepository.findById(id);
        if (objOptional.isPresent()) {
            return alocacaoMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Alocação não encontrada!");
        }
    }

    private void validate(Alocacao save, AlocacaoRequest request) throws BusinessException {
        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }

        if (save.getItens() != null) save.getItens().clear();
        Set<Long> consumidorIds = new HashSet<>();
        for (AlocacaoItemRequest itemRequest : request.getItens()) {
            if (itemRequest.getConsumidor() != null && itemRequest.getConsumidor().getId() != null) {
                if (!consumidorIds.add(itemRequest.getConsumidor().getId())) {
                    throw new BusinessException("Não pode existir mais de uma alocaçãoItem para o mesmo consumidor " + itemRequest.getConsumidor().getId());
                }
            }
        }

        if (request.getItens() != null && !request.getItens().isEmpty()) {
            for (AlocacaoItemRequest itemRequest : request.getItens()) {
                Consumidor consumidor = null;
                if (itemRequest.getConsumidor() != null && itemRequest.getConsumidor().getId() != null) {
                    consumidor = consumidorRepository.findById(itemRequest.getConsumidor().getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrado!"));
                }

                Optional<AlocacaoItem> alocacaoItem = alocacaoItemRepository.findById(new AlocacaoItemId(save.getId(), consumidor.getId()));
                if (alocacaoItem.isPresent()) {
                    save.getItens().add(alocacaoItem.get());
                } else {
                    save.adicionarItem(consumidor, itemRequest.getConsumo(), itemRequest.getConsumoRef(), itemRequest.getQuota(), itemRequest.getQuotaExcedente());
                }
            }
        }


    }

    private void definirFimVigenciaByUsina(Usina usina) throws BusinessException {
        List<Alocacao> alocacaosVigentes = alocacaoRepository.findByUsinaIdAndDataFinalIsNull(usina.getId());
        if (alocacaosVigentes != null && !alocacaosVigentes.isEmpty()) {
            for (Alocacao alocacao : alocacaosVigentes) {
                alocacao.setStatus(AlocacaoStatus.INATIVO);
                alocacao.setDataFinal(LocalDateTime.now());
                alocacaoRepository.save(alocacao);
            }
        }
    }

    private void validateDuplicate(Alocacao save, AlocacaoRequest request) throws BusinessException {

    }
}
