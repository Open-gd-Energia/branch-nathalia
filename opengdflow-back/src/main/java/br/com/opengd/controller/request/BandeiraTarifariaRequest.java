package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BandeiraTarifariaRequest {
    @NotNull
    private String nome;
    private String descricao;
    private BigDecimal adicional;
    private String cor;
}
