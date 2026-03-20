package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DevolucaoGeracaoDTO {
    @JsonProperty("saldos_geracao")
    private List<SaldoGeracaoDTO> saldosGeracao;

    @JsonProperty("cod_unidade_geradora")
    private String codUnidadeGeradora;
}
