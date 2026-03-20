package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CidadeResponse {
    private Long id;
    private String idIbge;
    private String nome;
    private String uf;
}
