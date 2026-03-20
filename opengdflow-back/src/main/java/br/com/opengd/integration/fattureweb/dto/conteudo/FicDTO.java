package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FicDTO {

    @JsonProperty("meta_anual")
    private Long metaAnual;

    @JsonProperty("meta_mensal")
    private Long metaMensal;

    @JsonProperty("apurado_mensal")
    private Long apuradoMensal;

    @JsonProperty("meta_trimestral")
    private Long metaTrimestral;

}
