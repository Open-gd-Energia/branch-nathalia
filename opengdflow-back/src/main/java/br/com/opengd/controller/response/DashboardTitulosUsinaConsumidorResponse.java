package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class DashboardTitulosUsinaConsumidorResponse {
    private String nomeUsina;
    private String ucUsina;
    private String nomeConsumidor;
    private String ucConsumidor;
    private LocalDate mesReferencia;
    private LocalDate dataVencimento;
    private BigDecimal valorTotal;
    private String status;

    public DashboardTitulosUsinaConsumidorResponse(String nomeUsina, String ucUsina, String nomeConsumidor, String ucConsumidor, LocalDate mesReferencia, LocalDate dataVencimento, BigDecimal valorTotal, String status) {
        this.nomeUsina = nomeUsina;
        this.ucUsina = ucUsina;
        this.nomeConsumidor = nomeConsumidor;
        this.ucConsumidor = ucConsumidor;
        this.mesReferencia = mesReferencia;
        this.dataVencimento = dataVencimento;
        this.valorTotal = valorTotal;
        this.status = status;
    }
}
