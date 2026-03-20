package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ConteudoDTO {

    @JsonProperty("status")
    private String status;

    @JsonProperty("mensagem")
    private String mensagem;

    @JsonProperty("dados")
    private DadosDTO dados;

}
