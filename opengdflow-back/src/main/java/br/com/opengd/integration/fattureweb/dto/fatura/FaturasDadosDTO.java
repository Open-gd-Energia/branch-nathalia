package br.com.opengd.integration.fattureweb.dto.fatura;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FaturasDadosDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("instalacao_id")
    private Long instalacaoId;

    @JsonProperty("status_fatura_id")
    private Long statusFaturaId;

    @JsonProperty("status")
    private Boolean status;

    @JsonProperty("data_criacao")
    private String dataCriacao;

    @JsonProperty("data_atualizacao")
    private String dataAtualizacao;

    @JsonProperty("data_processamento")
    private String dataProcessamento;

    @JsonProperty("erro_processamento")
    private String erroProcessamento;

    @JsonProperty("mes_referencia")
    private String mesReferencia;

    @JsonProperty("data_vencimento")
    private String dataVencimento;

    @JsonProperty("valor_total")
    private BigDecimal valorTotal;

}
