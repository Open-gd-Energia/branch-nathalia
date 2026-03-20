package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PrevisaoRequest {
    @NotNull
    private IdRequest usina;
    @NotNull
    private LocalDate mesReferencia;
    private BigDecimal geracaoPrevista;
    private BigDecimal consumoPrevisto;
    private BigDecimal geracaoMediaPrevista;
    private BigDecimal consumoMedioPrevisto;
}
