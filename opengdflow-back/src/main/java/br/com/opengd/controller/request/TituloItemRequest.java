package br.com.opengd.controller.request;

import br.com.opengd.enums.TituloItemTipo;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TituloItemRequest {
    private String nome;
    private BigDecimal valor;
    private String descricao;
    private TituloItemTipo tipo;
}
