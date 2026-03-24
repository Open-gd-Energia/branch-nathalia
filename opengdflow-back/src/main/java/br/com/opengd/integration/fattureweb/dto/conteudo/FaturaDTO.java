package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FaturaDTO {

    @JsonProperty("leitura")
    private LeituraDTO leitura;

    @JsonProperty("produtos")
    private List<ProdutoDTO> produtos;

    @JsonProperty("tributos")
    private List<TributoDTO> tributos;

    @JsonProperty("composicao")
    private ComposicaoDTO composicao;

    @JsonProperty("indicadores")
    private IndicadoresDTO indicadores;

    @JsonProperty("total_pagar")
    private BigDecimal totalPagar;

    @JsonProperty("data_emissao")
    private String dataEmissao;

    @JsonProperty("total_fatura")
    private BigDecimal totalFatura;

    @JsonProperty("mes_referencia")
    private String mesReferencia;

    @JsonProperty("data_vencimento")
    private String dataVencimento;

    @JsonProperty("data_apresentacao")
    private String dataApresentacao;

    @JsonProperty("devolucao_geracao")
    private DevolucaoGeracaoDTO devolucaoGeracao;

    @JsonProperty("demandas_contratadas")
    private List<DemandascontratadaDTO> demandasContratadas;

    @JsonProperty("historico_faturamento")
    private List<HistoricoFaturamentoDTO> historicoFaturamento;

    @JsonProperty("numero_fatura")
    private String numeroFatura;

    @JsonProperty("periodo_fiscal")
    private String periodoFiscal;

    @JsonProperty("bandeiras_tarifarias")
    private List<Object> bandeirasTarifarias;

}
