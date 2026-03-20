package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class GeracaoRequest {
    @NotNull
    private IdRequest usina;
    @NotNull
    private LocalDate mesReferencia;
    private BigDecimal valorConsumoInformado;
    private BigDecimal valorGeracaoInformado;
    private BigDecimal valorCreditoDistribuido;
    private BigDecimal valorEnergiaCompensada;
    private LocalDateTime dataCadastro;
}
