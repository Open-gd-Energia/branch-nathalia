package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.FaturaMapper;
import br.com.opengd.controller.request.FaturaHistoricoFaturamentoRequest;
import br.com.opengd.controller.request.FaturaRequest;
import br.com.opengd.controller.response.FaturaResponse;
import br.com.opengd.entity.*;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.BandeiraTarifariaRepository;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.FaturaRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.FaturaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FaturaUseCaseImpl implements FaturaUseCase {

    @Autowired
    FaturaRepository faturaRepository;

    @Autowired
    BandeiraTarifariaRepository bandeiraTarifariaRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    FaturaMapper faturaMapper;

    @Override
    public FaturaResponse create(FaturaRequest request, FattureWeb fattureWeb) throws BusinessException {
        validateDuplicate(null, request);
        Fatura save = faturaMapper.toEntity(request);
        validate(save, request);
        return faturaMapper.toResponse(faturaRepository.save(save));
    }

    @Override
    public List<FaturaResponse> findByAttributes(Map<String, String> params) {
        return faturaMapper.toResponseList(faturaRepository.findByDynamicQuery(params));
    }

    @Override
    public FaturaResponse update(Long id, FaturaRequest request) throws BusinessException {
        Fatura save = faturaRepository.findById(id).orElseThrow(() -> new BusinessException("Fatura não encontrada!"));
        validateDuplicate(save, request);
        faturaMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return faturaMapper.toResponse(faturaRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Fatura> perfilOptional = faturaRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                faturaRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Fatura em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Fatura não encontrado!");
        }
    }

    @Override
    public FaturaResponse get(Long id) throws BusinessException {
        Optional<Fatura> objOptional = faturaRepository.findById(id);
        if (objOptional.isPresent()) {
            return faturaMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Fatura não encontrado!");
        }
    }


    private void validate(Fatura save, FaturaRequest request) throws BusinessException {
        if (request.getBandeiraTarifaria() != null && request.getBandeiraTarifaria().getId() != null) {
            BandeiraTarifaria bandeiraTarifaria = bandeiraTarifariaRepository.findById(request.getBandeiraTarifaria().getId()).orElseThrow(() -> new BusinessException("Bandeira Tarifaria não encontrada!"));
            save.setBandeiraTarifaria(bandeiraTarifaria);
        }

        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }

        if (request.getConsumidor() != null && request.getConsumidor().getId() != null) {
            Consumidor consumidor = consumidorRepository.findById(request.getConsumidor().getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrada!"));
            save.setConsumidor(consumidor);
        }

        if (save.getHistoricoFaturamentos() != null) save.getHistoricoFaturamentos().clear();
        if (request.getHistoricoFaturamentos() != null && !request.getHistoricoFaturamentos().isEmpty()) {
            for (FaturaHistoricoFaturamentoRequest historicoFaturamento : request.getHistoricoFaturamentos()) {
                save.adicionarHistoricoFaturamento(historicoFaturamento.getDias(), historicoFaturamento.getEnergiaAtiva(), historicoFaturamento.getData());
            }
        }
    }

    private void validateDuplicate(Fatura save, FaturaRequest request) throws BusinessException {

    }
}
