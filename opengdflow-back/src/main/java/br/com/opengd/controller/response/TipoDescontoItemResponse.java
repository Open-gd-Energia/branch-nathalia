package br.com.opengd.controller.response;

import br.com.opengd.enums.DescontoTipo;
import br.com.opengd.enums.DescontoValorTipo;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TipoDescontoItemResponse {
    private Long id;
    private String nome;
    private DescontoTipo tipo;
    private DescontoValorTipo valorTipo;
    private BigDecimal valor;
}
