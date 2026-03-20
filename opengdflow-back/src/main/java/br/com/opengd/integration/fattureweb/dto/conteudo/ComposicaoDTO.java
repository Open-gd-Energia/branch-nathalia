package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ComposicaoDTO {

    @JsonProperty("outros")
    private Long outros;

    @JsonProperty("energia")
    private BigDecimal energia;

    @JsonProperty("encargos")
    private BigDecimal encargos;

    @JsonProperty("tributos")
    private BigDecimal tributos;

    @JsonProperty("transmissao")
    private BigDecimal transmissao;

    @JsonProperty("distribuicao")
    private BigDecimal distribuicao;

}
