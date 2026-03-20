package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class IrradiacaoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private LocalDate data;
    private BigDecimal valor;
}
