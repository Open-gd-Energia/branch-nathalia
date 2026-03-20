package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RegraTarifariaResponse {
    private Long id;
    private String nome;
    private BigDecimal valor;
    private String descricao;
}
