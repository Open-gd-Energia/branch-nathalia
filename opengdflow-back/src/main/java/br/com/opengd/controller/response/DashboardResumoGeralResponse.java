package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DashboardResumoGeralResponse {
    private BigDecimal totalEnergiaGerada;
    private BigDecimal totalEnergiaDistribuida;
    private BigDecimal saldoAcumulado;
    private BigDecimal usinasAtivas;
    private BigDecimal consumidoresAtivos;
}
