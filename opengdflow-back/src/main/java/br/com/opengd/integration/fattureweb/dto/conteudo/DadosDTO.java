package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class DadosDTO {

    @JsonProperty("fatura")
    private FaturaDTO fatura;

    @JsonProperty("outros")
    private OutrosDTO outros;

    @JsonProperty("fatura_id")
    private Long faturaId;

    @JsonProperty("data_insercao")
    private String dataInsercao;

    @JsonProperty("distribuidora")
    private String distribuidora;

    @JsonProperty("fatura_origem")
    private String faturaOrigem;

    @JsonProperty("modelo_fatura")
    private String modeloFatura;

    @JsonProperty("distribuidora_cnpj")
    private String distribuidoraCnpj;

    @JsonProperty("unidade_consumidora")
    private UnidadeconsumidoraDTO unidadeConsumidora;

}
