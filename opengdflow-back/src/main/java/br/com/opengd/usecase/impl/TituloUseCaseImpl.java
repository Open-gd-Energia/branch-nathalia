package br.com.opengd.usecase.impl;

import br.com.opengd.controller.mapper.TituloMapper;
import br.com.opengd.controller.request.TituloItemRequest;
import br.com.opengd.controller.request.TituloRequest;
import br.com.opengd.controller.response.TituloResponse;
import br.com.opengd.entity.Consumidor;
import br.com.opengd.entity.TipoDescontoItem;
import br.com.opengd.entity.Titulo;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.integration.sicoob.dto.SicoobBoletoResponse;
import br.com.opengd.repository.ConsumidorRepository;
import br.com.opengd.repository.TipoDescontoItemRepository;
import br.com.opengd.repository.TituloRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.service.BoletoService;
import br.com.opengd.usecase.TituloUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TituloUseCaseImpl implements TituloUseCase {

    @Autowired
    TituloRepository tituloRepository;

    @Autowired
    TipoDescontoItemRepository tipoDescontoItemRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    ConsumidorRepository consumidorRepository;

    @Autowired
    TituloMapper tituloMapper;

    private final BoletoService boletoService;

    @Autowired
    public TituloUseCaseImpl(BoletoService boletoService) {
        this.boletoService = boletoService;
    }


    @Override
    public TituloResponse create(TituloRequest request) throws BusinessException {
        validateDuplicate(null, request);
        Titulo save = tituloMapper.toEntity(request);
        validate(save, request);
        return tituloMapper.toResponse(tituloRepository.save(save));
    }

    @Override
    public List<TituloResponse> findByAttributes(Map<String, String> params) {
        return tituloMapper.toResponseList(tituloRepository.findByDynamicQuery(params));
    }

    @Override
    public TituloResponse update(Long id, TituloRequest request) throws BusinessException {
        Titulo save = tituloRepository.findById(id).orElseThrow(() -> new BusinessException("Titulo não encontrado!"));
        validateDuplicate(save, request);
        tituloMapper.updateEntityFromDto(request, save);
        validate(save, request);
        return tituloMapper.toResponse(tituloRepository.save(save));
    }

    @Override
    public Boolean delete(Long id) throws BusinessException {
        Optional<Titulo> perfilOptional = tituloRepository.findById(id);
        if (perfilOptional.isPresent()) {
            try {
                tituloRepository.delete(perfilOptional.get());
            } catch (DataIntegrityViolationException ex) {
                throw new BusinessException("Titulo em uso, não é possivel apagar!");
            }
            return true;
        } else {
            throw new BusinessException("Titulo não encontrado!");
        }
    }

    @Override
    public TituloResponse get(Long id) throws BusinessException {
        Optional<Titulo> objOptional = tituloRepository.findById(id);
        if (objOptional.isPresent()) {
            return tituloMapper.toResponse(objOptional.get());
        } else {
            throw new BusinessException("Titulo não encontrado!");
        }
    }

    @Override
    public TituloResponse emitirBoleto(Long id) throws BusinessException {
        Titulo save = tituloRepository.findById(id).orElseThrow(() -> new BusinessException("Titulo não encontrado!"));
        SicoobBoletoResponse sicoobBoletoResponse = boletoService.emitirSicoob(save);
        save.setLinhaDigitavel(sicoobBoletoResponse.getResultado().getCodigoBarras());
        save.setIdentificadorBoleto(sicoobBoletoResponse.getResultado().getIdentificacaoEmissaoBoleto().toString());
        save.setInstituicaoBoleto("SICOOB");
        return tituloMapper.toResponse(tituloRepository.save(save));
    }


    private void validate(Titulo save, TituloRequest request) throws BusinessException {
        if (request.getTipoDescontoItem() != null && request.getTipoDescontoItem().getId() != null) {
            TipoDescontoItem tipoDescontoItem = tipoDescontoItemRepository.findById(request.getTipoDescontoItem().getId()).orElseThrow(() -> new BusinessException("Tipo Desconto Item não encontrada!"));
            save.setTipoDescontoItem(tipoDescontoItem);
        }

        if (request.getUsina() != null && request.getUsina().getId() != null) {
            Usina usina = usinaRepository.findById(request.getUsina().getId()).orElseThrow(() -> new BusinessException("Usina não encontrada!"));
            save.setUsina(usina);
        }

        if (request.getConsumidor() != null && request.getConsumidor().getId() != null) {
            Consumidor consumidor = consumidorRepository.findById(request.getConsumidor().getId()).orElseThrow(() -> new BusinessException("Consumidor não encontrada!"));
            save.setConsumidor(consumidor);
        }

        if (save.getItens() != null) save.getItens().clear();
        if (request.getItens() != null && !request.getItens().isEmpty()) {
            for (TituloItemRequest tituloItem : request.getItens()) {
                save.adicionarItem(
                        tituloItem.getNome(),
                        tituloItem.getValor(),
                        tituloItem.getDescricao(),
                        tituloItem.getTipo()
                );
            }
        }
    }

    private void validateDuplicate(Titulo save, TituloRequest request) throws BusinessException {

    }
}
