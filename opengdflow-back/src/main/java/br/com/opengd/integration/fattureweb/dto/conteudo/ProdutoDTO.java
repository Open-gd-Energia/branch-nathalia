package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ProdutoDTO {

    @JsonProperty("tributos")
    private List<TributoDTO> tributos;

    @JsonProperty("descricao")
    private String descricao;

    @JsonProperty("quantidade")
    private BigDecimal quantidade;

    @JsonProperty("valor_total")
    private BigDecimal valorTotal;

    @JsonProperty("valor_sem_impostos")
    private BigDecimal valorSemImpostos;

    @JsonProperty("tarifa_com_impostos")
    private BigDecimal tarifaComImpostos;

    @JsonProperty("tarifa_sem_impostos")
    private BigDecimal tarifaSemImpostos;

    @JsonProperty("descricoes_originais")
    private List<String> descricoesOriginais;
}
