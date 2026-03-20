package br.com.opengd.controller.request;

import br.com.opengd.enums.DescontoTipo;
import br.com.opengd.enums.DescontoValorTipo;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TipoDescontoItemResquest {
    @NotNull
    private String nome;
    @NotNull
    private DescontoTipo tipo;
    @NotNull
    private DescontoValorTipo valorTipo;
    private BigDecimal valor;
}
