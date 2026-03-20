package br.com.opengd.controller.request;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import br.com.opengd.enums.PessoaTipo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RepresentanteRequest {
    private EnderecoRequest endereco;
    private PessoaFisicaRequest pessoaFisica;
    private PessoaJuridicaRequest pessoaJuridica;
    private PessoaTipo tipoPessoa;
    private String telefone;
    private String email;
    private ConsumidorRepresentanteRelacaoTipo tipoRelacao;
    private Long status;
    private List<RepresentanteConsumidorRequest> consumidores;
    private List<RepresentanteUsinaRequest> usinas;
}
