package br.com.opengd.controller.request;

import br.com.opengd.enums.ConexaoTipo;
import br.com.opengd.enums.TensaoConexaoTipo;
import br.com.opengd.enums.UsinaClassificacao;
import br.com.opengd.enums.UsinaStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
public class UsinaRequest {
    private ContaRequest conta;
    private EnderecoRequest endereco;
    private IdRequest faturamentoTipo;
    private IdRequest regraTarifaria;
    private IdRequest distribuidora;
    private IdRequest representanteTitular;
    private List<UsinaRespresentanteRequest> representantes;
    private String nome;
    private String uc;
    private UsinaClassificacao classificacao;
    private UsinaStatus status;
    private String loginDistribuidora;
    private String senhaDistribuidora;
    private BigDecimal demandaPonta;
    private BigDecimal demandaFPonta;
    private BigDecimal potenciaNominal;
    @JsonAlias("pontenciaPico")
    private BigDecimal potenciaPico;
    private TensaoConexaoTipo tensaoConexao;
    private ConexaoTipo tipoConexao;
    private BigDecimal saldoAcumulado;
    private BigDecimal saldoAcumuladoInicial;
    private Long prioridadeAlocacao;
    private LocalDate dataPrimeiraInjecao;
    private LocalDate dataTrocaTitularidade;
    private LocalDate dataPrimeiroCadastro;
    private LocalDate dataPrevistaLeitura;
    private BigDecimal valorKwh;
}
