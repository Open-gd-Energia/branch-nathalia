package br.com.opengd.integration.fattureweb.dto.fatura;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class FaturasDTO {

    @JsonProperty("status")
    private String status;

    @JsonProperty("mensagem")
    private String mensagem;

    @JsonProperty("dados")
    private List<FaturasDadosDTO> dados;

}
