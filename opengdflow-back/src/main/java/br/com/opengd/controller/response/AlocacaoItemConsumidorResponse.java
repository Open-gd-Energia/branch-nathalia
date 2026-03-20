package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AlocacaoItemConsumidorResponse {
    private ConsumidorDadosPrimariosResponse consumidor;
    private BigDecimal consumo;
    private BigDecimal consumoRef;
    private BigDecimal quota;
    private BigDecimal quotaExcedente;
}
