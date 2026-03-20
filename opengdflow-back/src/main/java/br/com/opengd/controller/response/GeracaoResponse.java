package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class GeracaoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private LocalDate mesReferencia;
    private BigDecimal valorConsumoInformado;
    private BigDecimal valorGeracaoInformado;
    private BigDecimal valorCreditoDistribuido;
    private BigDecimal valorEnergiaCompensada;
    private LocalDateTime dataCadastro;
}
