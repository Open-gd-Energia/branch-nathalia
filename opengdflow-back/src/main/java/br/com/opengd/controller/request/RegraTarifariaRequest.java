package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RegraTarifariaRequest {
    @NotNull
    private String nome;
    private BigDecimal valor;
    private String descricao;
}
