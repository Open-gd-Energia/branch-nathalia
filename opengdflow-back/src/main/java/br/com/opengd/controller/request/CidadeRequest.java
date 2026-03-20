package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CidadeRequest {
    @NotNull
    private String idIbge;
    @NotNull
    private String nome;
    @NotNull
    private String uf;
}
