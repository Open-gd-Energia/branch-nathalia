package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class IndicadoresDTO {

    @JsonProperty("dic")
    private DicDTO dic;

    @JsonProperty("fic")
    private FicDTO fic;

    @JsonProperty("dmic")
    private DmicDTO dmic;

    @JsonProperty("eusd")
    private EusdDTO eusd;

    @JsonProperty("dicri")
    private DicriDTO dicri;

    @JsonProperty("conjunto")
    private String conjunto;

}
