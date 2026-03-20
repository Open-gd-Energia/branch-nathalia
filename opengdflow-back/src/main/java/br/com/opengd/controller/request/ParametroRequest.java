package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParametroRequest {
    @NotNull
    private String chave;
    private String valor;
}
