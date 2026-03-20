package br.com.opengd.controller.request;

import br.com.opengd.enums.ConexaoTipo;
import br.com.opengd.enums.ConsumidorClassificacao;
import br.com.opengd.enums.ConsumidorStatus;
import br.com.opengd.enums.ConsumidorTipo;
import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ConsumidorRequest {
    @NotNull
    private IdRequest distribuidora;
    private EnderecoRequest endereco;
    @Valid
    private List<ConsumidorRepresentanteRequest> representantes;
    @NotNull
    private IdRequest representanteTitular;
    @NotNull
    private String nome;
    private String uc;
    private ConsumidorClassificacao classificacao;
    private ConsumidorTipo tipo;
    private BigDecimal geracaoPropria;
    @JsonAlias("consumorReferenciaKwh")
    private BigDecimal consumoReferenciaKwh;
    private String loginDistribuidora;
    private String senhaDistribuidora;
    private LocalDate dataAssinaturaContrato;
    private ConsumidorStatus status;
    private ConexaoTipo tipoConexao;
}
