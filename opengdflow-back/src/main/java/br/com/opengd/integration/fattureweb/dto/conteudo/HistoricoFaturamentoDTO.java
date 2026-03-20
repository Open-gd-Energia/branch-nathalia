package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class HistoricoFaturamentoDTO {

    @JsonProperty("data")
    private String data;

    @JsonProperty("periodo_dias")
    private Long periodoDias;

    @JsonProperty("energia_ativa")
    private Long energiaAtiva;

}
