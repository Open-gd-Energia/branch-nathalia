package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PessoaJuridicaResponse {
    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private String inscricaoEstadual;
}
