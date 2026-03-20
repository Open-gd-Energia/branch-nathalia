package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AlocacaoItemResponse {
    private AlocacaoDadosPrimariosResponse alocacao;
    private ConsumidorDadosPrimariosResponse consumidor;
    private BigDecimal consumo;
    private BigDecimal consumoRef;
    private BigDecimal quota;
    private BigDecimal quotaExcedente;
}
