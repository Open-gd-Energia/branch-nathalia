package br.com.opengd.controller.response;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import br.com.opengd.enums.PessoaTipo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RepresentanteDadosPrimariosResponse {
    private Long id;
    private EnderecoResponse endereco;
    private PessoaFisicaResponse pessoaFisica;
    private PessoaJuridicaResponse pessoaJuridica;
    private PessoaTipo tipoPessoa;
    private String telefone;
    private String email;
    private ConsumidorRepresentanteRelacaoTipo tipoRelacao;
    private LocalDateTime dataAlteracao;
    private Long status;
}
