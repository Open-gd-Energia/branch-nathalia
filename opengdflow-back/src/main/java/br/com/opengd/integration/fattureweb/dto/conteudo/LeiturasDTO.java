package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class LeiturasDTO {

    @JsonProperty("posto")
    private String posto;

    @JsonProperty("valor_atual")
    private BigDecimal valorAtual;

    @JsonProperty("valor_leitura")
    private BigDecimal valorLeitura;

    @JsonProperty("valor_anterior")
    private BigDecimal valorAnterior;

    @JsonProperty("ativa_ou_reativa")
    private String ativaOuReativa;

    @JsonProperty("consumo_ou_geracao")
    private String consumoOuGeracao;

    @JsonProperty("energia_ou_demanda")
    private String energiaOuDemanda;

    @JsonProperty("fator_multiplicador")
    private Long fatorMultiplicador;

    @JsonProperty("criterio_medicao")
    private String criterioMedicao;

}
