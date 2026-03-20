package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EstatisticaFaturaResponse {
    private BigDecimal consumoUltimoMes;
    private BigDecimal consumoMedio;
    private BigDecimal consumoTotal;
    private BigDecimal creditosAcumulados;
    private BigDecimal saldoFaltante;
}
