package br.com.opengd.controller.response;

import br.com.opengd.controller.request.FaturaHistoricoFaturamentoRequest;
import br.com.opengd.enums.FaturaStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class FaturaResponse {
    private Long id;
    private BandeiraTarifariaResponse bandeiraTarifaria;
    private UsinaResponse usina;
    private ConsumidorDadosPrimariosResponse consumidor;
    private String numeroFatura;
    private String unidadeConsumidora;
    private Long custoDisponibilidade;
    private LocalDate mesReferencia;
    private BigDecimal geracaoAnterior;
    private BigDecimal leituraAtualConsumo;
    private BigDecimal leituraAtualGeracao;
    private LocalDate dataLeituraAtual;
    private LocalDate proximaLeitura;
    private LocalDate vencimento;
    private BigDecimal valorTotalFatura;
    private BigDecimal consumo;
    private BigDecimal consumoLocalUsina;
    private BigDecimal energiaInjetada;
    @JsonAlias("energiaConpensadaLocal")
    private BigDecimal energiaCompensadaLocal;
    private BigDecimal saldoAcumuladoAtual;
    private BigDecimal saldoAcumuladoAnterior;
    private BigDecimal movimentacaoSaldo;
    private BigDecimal energiaDistribuida;
    private BigDecimal tarifaTESI;
    private BigDecimal tarifaTUSDSI;
    private BigDecimal tarifaTotalSI;
    private BigDecimal tarifaTECI;
    private BigDecimal tarifaTUSDCI;
    private BigDecimal tarifaTotalCI;
    private BigDecimal tarifaTECompensavel;
    private BigDecimal tarifaTUSDCompensavel;
    private BigDecimal tarifaTotalCompensavel;
    private BigDecimal tarifaBandVermelhaP1SI;
    private BigDecimal tarifaBandVermelhaP1CI;
    private BigDecimal tarifaBandVermelhaP2SI;
    private BigDecimal tarifaBandVermelhaP2CI;
    private BigDecimal tarifaBandAmarelaSI;
    private BigDecimal tarifaBandAmarelaCI;
    private BigDecimal tarifaBandVermelhaP1Compensavel;
    private BigDecimal tarifaBandVermelhaP2Compensavel;
    private BigDecimal tarifaBandAmarelaCompensavel;
    private BigDecimal icms;
    private BigDecimal valorIcms;
    private BigDecimal pis;
    private BigDecimal valorPis;
    @JsonAlias("confins")
    private BigDecimal cofins;
    @JsonAlias("valorConfins")
    private BigDecimal valorCofins;
    private BigDecimal valorEnergiaCompensada;
    private BigDecimal custoSemGD;
    private List<FaturaHistoricoFaturamentoRequest> historicoFaturamentos;
    private BigDecimal energiaCompensadaOUC;
    private BigDecimal saldoRecebidoOUC;
    private BigDecimal relCreditoConsumo;
    private BigDecimal saldoFaltante;
    private FaturaStatus status;
    private String faturaPDF;
    private BigDecimal creditoDistribuidos;
    private String observacao;
    // Campos adicionados via FattureWeb JSON
    private LocalDate dataEmissao;
    private String notaFiscal;
    private Boolean avisoCrte;
    private Boolean possuiDebitos;
    private String subgrupo;
    private String codUnidadeGeradora;
}
