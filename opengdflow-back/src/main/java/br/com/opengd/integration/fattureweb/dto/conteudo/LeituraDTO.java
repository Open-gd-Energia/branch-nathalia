package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class LeituraDTO {

    @JsonProperty("medidores")
    private List<MedidoresDTO> medidores;

    @JsonProperty("data_atual")
    private String dataAtual;

    @JsonProperty("periodo_dias")
    private Long periodoDias;

    @JsonProperty("data_anterior")
    private String dataAnterior;

    @JsonProperty("data_proxima")
    private String dataProxima;

    @JsonProperty("fator_potencia")
    private BigDecimal fatorPotencia;

}
