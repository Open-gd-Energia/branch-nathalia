package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EstatisticaGeracaoResponse {
    private BigDecimal potencia;
    private BigDecimal mediaGeracao;
    private BigDecimal geracaoTotal;
    private BigDecimal alocacaoAtual;
    private BigDecimal creditoAcumulado;
}
