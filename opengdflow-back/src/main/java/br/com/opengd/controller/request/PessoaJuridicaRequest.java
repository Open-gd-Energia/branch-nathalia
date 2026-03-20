package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PessoaJuridicaRequest {
    private String razaoSocial;
    private String nomeFantasia;
    private String cnpj;
    private String inscricaoEstadual;
}
