package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AlocacaoItemRequest {
    @NotNull
    private IdRequest consumidor;
    private BigDecimal consumo;
    private BigDecimal consumoRef;
    private BigDecimal quota;
    private BigDecimal quotaExcedente;
}
