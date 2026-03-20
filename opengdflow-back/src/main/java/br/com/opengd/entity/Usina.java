package br.com.opengd.entity;

import br.com.opengd.enums.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USINA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "conta_id", nullable = true)
    private Conta conta;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", nullable = true)
    private Endereco endereco;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "faturamento_tipo_id", nullable = true)
    private FaturamentoTipo faturamentoTipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "regra_tarifaria_id", nullable = true)
    private RegraTarifaria regraTarifaria;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "distribuidora_id", nullable = true)
    private Distribuidora distribuidora;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "representante_id", nullable = true)
    private Representante representanteTitular;

    @OneToMany(mappedBy = "usina", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsinaRepresentante> representantes = new ArrayList<>();

    private String nome;

    private String uc;

    @Enumerated(EnumType.STRING)
    private UsinaClassificacao classificacao;

    @Enumerated(EnumType.STRING)
    private UsinaStatus status;

    @JsonIgnore
    private String loginDistribuidora;

    @JsonIgnore
    private String senhaDistribuidora;

    private BigDecimal demandaPonta;

    private BigDecimal demandaFPonta;

    private BigDecimal potenciaNominal;

    @Column(name = "potencia_pico")
    private BigDecimal potenciaPico;

    @Enumerated(EnumType.STRING)
    private TensaoConexaoTipo tensaoConexao;

    @Enumerated(EnumType.STRING)
    private ConexaoTipo tipoConexao;

    private BigDecimal saldoAcumulado;

    private BigDecimal saldoAcumuladoInicial;

    private Long prioridadeAlocacao;

    private LocalDate dataPrimeiraInjecao;

    private LocalDate dataTrocaTitularidade;

    private LocalDate dataPrimeiroCadastro;

    private LocalDate dataPrevistaLeitura;

    private BigDecimal valorKwh;

    public void adicionarRepresentante(Representante representante, UsinaRepresentanteRelacaoTipo relacao) {
        UsinaRepresentante cr = new UsinaRepresentante(representante, this, relacao);
        representantes.add(cr);
    }
//    @PrePersist
//    @PreUpdate
//    private void padronizar() {
//        if (this.nome != null) {
//            this.nome = this.nome.toUpperCase();
//        }
//        if (this.identificador != null) {
//            this.identificador = this.identificador.toUpperCase();
//        }
//    }
}