package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PrevisaoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private LocalDate mesReferencia;
    private BigDecimal geracaoPrevista;
    private BigDecimal consumoPrevisto;
    private BigDecimal geracaoMediaPrevista;
    private BigDecimal consumoMedioPrevisto;
}
