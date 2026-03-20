package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DemandascontratadaDTO {

    @JsonProperty("posto")
    private String posto;

    @JsonProperty("valor")
    private Long valor;

}
