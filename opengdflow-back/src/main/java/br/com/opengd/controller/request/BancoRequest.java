package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BancoRequest {
    @NotNull
    private String nome;
    private Long codigoBacen;
}
