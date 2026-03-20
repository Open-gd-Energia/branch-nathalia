package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DashboardEnergiaGeradaConsumidaResponse {
    private String mesReferencia;
    private BigDecimal energiaGerada;
    private BigDecimal energiaConsumida;

    public DashboardEnergiaGeradaConsumidaResponse(String mesReferencia, BigDecimal energiaGerada, BigDecimal energiaConsumida) {
        this.mesReferencia = mesReferencia;
        this.energiaGerada = energiaGerada;
        this.energiaConsumida = energiaConsumida;
    }
}