package br.com.opengd.controller.response;

import br.com.opengd.enums.Sexo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PessoaFisicaResponse {
    private String nome;
    private String cpf;
    private String rg;
    private String profissao;
    private Sexo sexo;
    private String nacionalidade;
    private String estadoCivil;
    private LocalDate dataNascimento;
}
