package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class OutrosDTO {

    @JsonProperty("fisco")
    private String fisco;

    @JsonProperty("nota_fiscal")
    private String notaFiscal;

    @JsonProperty("codigo_barras")
    private String codigoBarras;

    @JsonProperty("classe_consumo")
    private String classeConsumo;

    @JsonProperty("numero_cliente")
    private String numeroCliente;

    @JsonProperty("roteiro_leitura")
    private String roteiroLeitura;

    @JsonProperty("debito_automatico")
    private Boolean debitoAutomatico;

}
