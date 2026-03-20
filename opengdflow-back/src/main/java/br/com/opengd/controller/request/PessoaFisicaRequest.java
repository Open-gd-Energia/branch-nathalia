package br.com.opengd.controller.request;

import br.com.opengd.enums.Sexo;
import br.com.opengd.utils.FlexibleLocalDateDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PessoaFisicaRequest {
    private String nome;
    private String cpf;
    private String rg;
    private String profissao;
    private Sexo sexo;
    private String nacionalidade;
    private String estadoCivil;
    @JsonDeserialize(using = FlexibleLocalDateDeserializer.class)
    private LocalDate dataNascimento;
}
