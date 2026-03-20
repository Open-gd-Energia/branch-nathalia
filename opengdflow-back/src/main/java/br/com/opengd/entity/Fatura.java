package br.com.opengd.entity;

import br.com.opengd.enums.FaturaStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "FATURA")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Fatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bandeira_tarifaria_id")
    private BandeiraTarifaria bandeiraTarifaria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usina_id")
    private Usina usina;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumidor_id")
    private Consumidor consumidor;

    private String numeroFatura;
    private String unidadeConsumidora;
    private Long custoDisponibilidade;
    private LocalDate mesReferencia;

    // Medições de Energia e Leituras (4 casas decimais)
    @Column(precision = 19, scale = 4)
    private BigDecimal geracaoAnterior;

    @Column(precision = 19, scale = 4)
    private BigDecimal leituraAtualConsumo;

    @Column(precision = 19, scale = 4)
    private BigDecimal leituraAtualGeracao;

    private LocalDate dataLeituraAtual;
    private LocalDate proximaLeitura;
    private LocalDate vencimento;

    // Valores Financeiros (2 casas decimais)
    @Column(precision = 19, scale = 2)
    private BigDecimal valorTotalFatura;

    @Column(precision = 19, scale = 4)
    private BigDecimal consumo;

    @Column(precision = 19, scale = 4)
    private BigDecimal consumoLocalUsina;

    @Column(precision = 19, scale = 4)
    private BigDecimal energiaInjetada;

    @Column(name = "energia_compensada_local", precision = 19, scale = 4)
    private BigDecimal energiaCompensadaLocal;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoAcumuladoAtual;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoAcumuladoAnterior;

    @Column(precision = 19, scale = 4)
    private BigDecimal movimentacaoSaldo;

    @Column(precision = 19, scale = 4)
    private BigDecimal energiaDistribuida;

    // Tarifas (4 casas decimais para evitar erros de arredondamento em cálculos)
    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTESI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTUSDSI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTotalSI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTECI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTUSDCI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTotalCI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTECompensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTUSDCompensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaTotalCompensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP1SI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP1CI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP2SI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP2CI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandAmarelaSI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandAmarelaCI;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP1Compensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandVermelhaP2Compensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaBandAmarelaCompensavel;

    // Impostos e Taxas
    @Column(precision = 19, scale = 4)
    private BigDecimal icms;

    @Column(precision = 19, scale = 2)
    private BigDecimal valorIcms;

    @Column(precision = 19, scale = 4)
    private BigDecimal pis;

    @Column(precision = 19, scale = 2)
    private BigDecimal valorPis;

    @Column(name = "confins", precision = 19, scale = 4)
    private BigDecimal cofins;

    @Column(name = "valor_confins", precision = 19, scale = 2)
    private BigDecimal valorCofins;

    @Column(precision = 19, scale = 2)
    private BigDecimal valorEnergiaCompensada;

    @Column(precision = 19, scale = 2)
    private BigDecimal custoSemGD;

    @OneToMany(mappedBy = "fatura", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FaturaHistoricoFaturamento> historicoFaturamentos = new ArrayList<>();

    @Column(precision = 19, scale = 4)
    private BigDecimal energiaCompensadaOUC;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoRecebidoOUC;

    @Column(precision = 19, scale = 4)
    private BigDecimal relCreditoConsumo;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoFaltante;

    @Enumerated(EnumType.STRING)
    private FaturaStatus status;

    @Column(columnDefinition = "TEXT")
    private String faturaPDF;

    @Column(precision = 19, scale = 4)
    private BigDecimal creditoDistribuidos;

    private String observacao;

    @OneToOne(mappedBy = "fatura", cascade = CascadeType.ALL, optional = true)
    private FattureWeb fattureWeb;

    public void adicionarHistoricoFaturamento(Long dias, Long energiaAtiva, LocalDate data) {
        FaturaHistoricoFaturamento hf = new FaturaHistoricoFaturamento(null, this, dias, energiaAtiva, data);
        historicoFaturamentos.add(hf);
    }
}