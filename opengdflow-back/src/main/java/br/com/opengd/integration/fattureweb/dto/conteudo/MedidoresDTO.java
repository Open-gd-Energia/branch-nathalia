package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class MedidoresDTO {

    @JsonProperty("leituras")
    private List<LeiturasDTO> leituras;

    @JsonProperty("numero_medidor")
    private String numeroMedidor;

    @JsonProperty("taxa_perda_transformacao")
    private Long taxaPerdaTransformacao;

}
