package br.com.opengd.controller.response;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import br.com.opengd.enums.PessoaTipo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RepresentanteResponse {
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
    private List<RepresentanteConsumidorResponse> consumidores;
    private List<RepresentanteUsinaResponse> usinas;
}
