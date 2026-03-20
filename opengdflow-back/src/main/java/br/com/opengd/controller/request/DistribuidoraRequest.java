package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DistribuidoraRequest {
    @NotNull
    private String nome;
    private String sigla;
    private Long status;
    private String url;
    private String cnpj;
}
