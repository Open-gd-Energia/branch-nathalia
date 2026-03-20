package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class IrradiacaoRequest {
    @NotNull
    private IdRequest usina;
    private LocalDate data;
    private BigDecimal valor;
}
