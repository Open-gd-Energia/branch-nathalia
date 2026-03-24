package br.com.opengd.controller.request;

import br.com.opengd.enums.FaturaStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class FaturaRequest {
    private IdRequest bandeiraTarifaria;
    private IdRequest usina;
    private IdRequest consumidor;
    private String numeroFatura;
    private String unidadeConsumidora;
    private Long custoDisponibilidade;
    private LocalDate mesReferencia;
    private BigDecimal geracaoAnterior;
    //todo Alterado
    private BigDecimal leituraAtualConsumo;
    //todo Novo
    private BigDecimal leituraAtualGeracao;
    private LocalDate dataLeituraAtual;
    private LocalDate proximaLeitura;
    private LocalDate vencimento;
    private BigDecimal valorTotalFatura;
    //todo Novo
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
    //todo Alterado
    private BigDecimal tarifaBandVermelhaP1SI;
    //todo Alterado
    private BigDecimal tarifaBandVermelhaP1CI;
    //todo Novo
    private BigDecimal tarifaBandVermelhaP2SI;
    //todo Novo
    private BigDecimal tarifaBandVermelhaP2CI;
    //todo Novo
    private BigDecimal tarifaBandAmarelaSI;
    //todo Novo
    private BigDecimal tarifaBandAmarelaCI;
    //todo Alterado
    private BigDecimal tarifaBandVermelhaP1Compensavel;
    //todo Novo
    private BigDecimal tarifaBandVermelhaP2Compensavel;
    //todo Novo
    private BigDecimal tarifaBandAmarelaCompensavel;
    private BigDecimal icms;
    //todo Novo
    private BigDecimal valorIcms;
    private BigDecimal pis;
    //todo Novo
    private BigDecimal valorPis;
    @JsonAlias("confins")
    private BigDecimal cofins;
    @JsonAlias("valorConfins")
    private BigDecimal valorCofins;
    private BigDecimal valorEnergiaCompensada;
    private BigDecimal custoSemGD;
    //todo Alterado
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
