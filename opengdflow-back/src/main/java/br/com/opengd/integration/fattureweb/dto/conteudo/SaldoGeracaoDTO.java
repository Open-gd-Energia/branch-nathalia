package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class SaldoGeracaoDTO {

    @JsonProperty("posto")
    private String posto;

    @JsonProperty("valor")
    private BigDecimal valor;

    @JsonProperty("saldo_recebido")
    private BigDecimal saldoRecebido;

}