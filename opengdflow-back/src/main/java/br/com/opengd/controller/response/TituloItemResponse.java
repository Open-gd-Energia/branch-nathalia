package br.com.opengd.controller.response;

import br.com.opengd.enums.TituloItemTipo;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TituloItemResponse {
    private Long id;
    private String nome;
    private BigDecimal valor;
    private String descricao;
    private TituloItemTipo tipo;
}
