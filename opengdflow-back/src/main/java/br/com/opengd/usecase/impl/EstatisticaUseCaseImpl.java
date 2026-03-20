package br.com.opengd.usecase.impl;

import br.com.opengd.controller.response.EstatisticaFaturaResponse;
import br.com.opengd.controller.response.EstatisticaGeracaoResponse;
import br.com.opengd.entity.AlocacaoItem;
import br.com.opengd.entity.Fatura;
import br.com.opengd.entity.Geracao;
import br.com.opengd.entity.Usina;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.AlocacaoItemRepository;
import br.com.opengd.repository.FaturaRepository;
import br.com.opengd.repository.GeracaoRepository;
import br.com.opengd.repository.UsinaRepository;
import br.com.opengd.usecase.EstatisticaUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class EstatisticaUseCaseImpl implements EstatisticaUseCase {

    @Autowired
    FaturaRepository faturaRepository;

    @Autowired
    UsinaRepository usinaRepository;

    @Autowired
    GeracaoRepository geracaoRepository;

    @Autowired
    AlocacaoItemRepository alocacaoItemRepository;

    @Override
    public EstatisticaFaturaResponse getEstatisticaFaturaConsumidor(Long id) {
        Pageable pageable = PageRequest.of(0, 12);
        List<Fatura> faturas = faturaRepository.findByConsumidor(id, pageable);
        return createResponse(faturas);
    }

    @Override
    public EstatisticaFaturaResponse getEstatisticaFaturaUsina(Long id) {
        Pageable pageable = PageRequest.of(0, 12);
        List<Fatura> faturas = faturaRepository.findByUsina(id, pageable);
        return createResponse(faturas);
    }

    @Override
    public EstatisticaGeracaoResponse getEstatisticaGeracaoUsina(Long id) throws BusinessException {
        EstatisticaGeracaoResponse responseDefault = new EstatisticaGeracaoResponse();
        responseDefault.setPotencia(BigDecimal.ZERO);
        responseDefault.setMediaGeracao(BigDecimal.ZERO);
        responseDefault.setGeracaoTotal(BigDecimal.ZERO);
        responseDefault.setAlocacaoAtual(BigDecimal.ZERO);
        responseDefault.setCreditoAcumulado(BigDecimal.ZERO);

        Optional<Usina> usina = usinaRepository.findById(id);
        if (usina.isPresent()) {
            Usina usinaEntity = usina.get();
            Pageable pageable = PageRequest.of(0, 12);
            List<Geracao> geracaoList = geracaoRepository.findByUsina(id, pageable);
            responseDefault.setPotencia(notNull(usinaEntity.getPotenciaNominal()));
            responseDefault.setMediaGeracao(calculateGeracaoMedio(geracaoList));
            responseDefault.setGeracaoTotal(calculateTotalGeracao(geracaoList));
            List<AlocacaoItem> alocacaoItemList = alocacaoItemRepository.findVigentesByUsina(id);
            responseDefault.setAlocacaoAtual(calculateAlocacaoAtual(alocacaoItemList));
            //TODO a definir com Edipo/Willian
            //responseDefault.setCreditoAcumulado(notNull(usinaEntity.getCreditoAcumulado()));
        }
        return responseDefault;
    }

    private EstatisticaFaturaResponse createResponse(List<Fatura> faturas) {
        EstatisticaFaturaResponse estatisticaFaturaResponse = new EstatisticaFaturaResponse();
        if (faturas != null && !faturas.isEmpty()) {
            estatisticaFaturaResponse.setConsumoUltimoMes(calculateConsumoMesAnterior(faturas));
            estatisticaFaturaResponse.setConsumoMedio(calculateConsumoMedio(faturas));
            estatisticaFaturaResponse.setConsumoTotal(notNull(faturas.getFirst().getConsumo()));
            estatisticaFaturaResponse.setCreditosAcumulados(notNull(faturas.getFirst().getSaldoAcumuladoAtual()));
            estatisticaFaturaResponse.setSaldoFaltante(notNull(faturas.getFirst().getSaldoFaltante()));
            return estatisticaFaturaResponse;
        } else {
            estatisticaFaturaResponse.setConsumoUltimoMes(BigDecimal.ZERO);
            estatisticaFaturaResponse.setConsumoMedio(BigDecimal.ZERO);
            estatisticaFaturaResponse.setConsumoTotal(BigDecimal.ZERO);
            estatisticaFaturaResponse.setCreditosAcumulados(BigDecimal.ZERO);
            estatisticaFaturaResponse.setSaldoFaltante(BigDecimal.ZERO);
        }
        return estatisticaFaturaResponse;
    }

    private BigDecimal calculateConsumoMedio(List<Fatura> faturas) {
        if (faturas == null || faturas.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal totalConsumo = faturas.stream()
                .map(fatura -> fatura.getConsumo() != null ? fatura.getConsumo() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return totalConsumo.divide(BigDecimal.valueOf(faturas.size()), BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal calculateGeracaoMedio(List<Geracao> geracaoList) {
        if (geracaoList == null || geracaoList.isEmpty()) {
            return BigDecimal.ZERO;
        }
        BigDecimal valorReturn = geracaoList.stream()
                .map(fatura -> fatura.getValorGeracaoInformado() != null ? fatura.getValorGeracaoInformado() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return valorReturn.divide(BigDecimal.valueOf(geracaoList.size()), BigDecimal.ROUND_HALF_UP);
    }

    private BigDecimal calculateTotalGeracao(List<Geracao> geracaoList) {
        if (geracaoList == null || geracaoList.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return geracaoList.stream()
                .map(geracao -> geracao.getValorGeracaoInformado() != null ? geracao.getValorGeracaoInformado() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateAlocacaoAtual(List<AlocacaoItem> alocacaoItems) {
        if (alocacaoItems == null || alocacaoItems.isEmpty()) {
            return BigDecimal.ZERO;
        }

        //TODO Edipo diz: quota + quotaExcedente de todos os clientes existentes na alocação ativa da usina
        BigDecimal quotaTotal = alocacaoItems.stream()
                .map(alocacaoItem -> alocacaoItem.getQuota() != null ? alocacaoItem.getQuota() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal quotaExcedenteTotal = alocacaoItems.stream()
                .map(alocacaoItem -> alocacaoItem.getQuotaExcedente() != null ? alocacaoItem.getQuotaExcedente() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return quotaTotal.add(quotaExcedenteTotal);
    }


    private BigDecimal calculateConsumoMesAnterior(List<Fatura> faturas) {
        if (faturas == null || faturas.size() < 2) {
            return BigDecimal.ZERO;
        }
        return faturas.get(1).getConsumo();
    }

    private BigDecimal notNull(BigDecimal valor) {
        return valor != null ? valor : BigDecimal.ZERO;
    }
}
