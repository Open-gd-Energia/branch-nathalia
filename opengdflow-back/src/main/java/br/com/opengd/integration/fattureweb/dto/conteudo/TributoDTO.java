package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class TributoDTO {

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("taxa")
    private BigDecimal taxa;

    @JsonProperty("valor")
    private BigDecimal valor;

    @JsonProperty("base_calculo")
    private BigDecimal baseCalculo;

}
