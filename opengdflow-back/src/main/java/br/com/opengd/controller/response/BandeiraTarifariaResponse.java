package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BandeiraTarifariaResponse {
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal adicional;
    private String cor;
}
