package br.com.opengd.controller.response;

import br.com.opengd.enums.ConexaoTipo;
import br.com.opengd.enums.ConsumidorClassificacao;
import br.com.opengd.enums.ConsumidorStatus;
import br.com.opengd.enums.ConsumidorTipo;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ConsumidorResponse {
    private Long id;
    private DistribuidoraResponse distribuidora;
    private List<ConsumidorRepresentanteResponse> representantes;
    private RepresentanteDadosPrimariosResponse representanteTitular;
    private EnderecoResponse endereco;
    private String nome;
    private String uc;
    private ConsumidorClassificacao classificacao;
    private ConsumidorTipo tipo;
    private BigDecimal geracaoPropria;
    @JsonAlias("consumorReferenciaKwh")
    private BigDecimal consumoReferenciaKwh;
    @JsonIgnore
    private String loginDistribuidora;
    @JsonIgnore
    private String senhaDistribuidora;
    private LocalDate dataAssinaturaContrato;
    private ConsumidorStatus status;
    private ConexaoTipo tipoConexao;
}
