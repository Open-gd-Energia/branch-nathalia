package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DistribuidoraResponse {
    private Long id;
    private String nome;
    private String sigla;
    private Long status;
    private String url;
    private String cnpj;
}
