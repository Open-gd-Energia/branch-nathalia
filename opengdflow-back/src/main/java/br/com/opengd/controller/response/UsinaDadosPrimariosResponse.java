package br.com.opengd.controller.response;

import br.com.opengd.enums.ConexaoTipo;
import br.com.opengd.enums.TensaoConexaoTipo;
import br.com.opengd.enums.UsinaStatus;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class UsinaDadosPrimariosResponse {
    private Long id;
    private ContaResponse conta;
    private EnderecoResponse endereco;
    private FaturamentoTipoResponse faturamentoTipo;
    private RegraTarifariaResponse regraTarifaria;
    private DistribuidoraResponse distribuidora;
    private String nome;
    private String uc;
    private String classificacao;
    private UsinaStatus status;
    @JsonIgnore
    private String loginDistribuidora;
    @JsonIgnore
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
