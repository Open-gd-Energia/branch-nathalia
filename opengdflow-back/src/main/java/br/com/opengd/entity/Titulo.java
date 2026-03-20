package br.com.opengd.entity;

import br.com.opengd.enums.TituloItemTipo;
import br.com.opengd.enums.TituloStatus;
import br.com.opengd.enums.TituloTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TITULO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Titulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Alterado para LAZY para evitar carregamento excessivo de dados (N+1) identificado nos logs
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_desconto_item_id", nullable = true)
    private TipoDescontoItem tipoDescontoItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usina_id", nullable = true)
    private Usina usina;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumidor_id", nullable = true)
    private Consumidor consumidor;

    private String identificador;

    @Enumerated(EnumType.STRING)
    private TituloTipo tipo;

    private LocalDate mesReferencia;
    private LocalDate dataVencimento;
    private LocalDate dataEmissao;

    @Enumerated(EnumType.STRING)
    private TituloStatus status;

    private String observacao;

    // Correção de Overflow: Definida precisão para suportar grandes volumes de energia e valores financeiros
    @Column(precision = 19, scale = 4)
    private BigDecimal energiaInjetada;

    @Column(precision = 19, scale = 4)
    private BigDecimal consumoLocal;

    @Column(precision = 19, scale = 4)
    private BigDecimal energiaCompensada;

    @Column(precision = 19, scale = 4)
    private BigDecimal energiaDistribuida;

    @Column(precision = 19, scale = 2)
    private BigDecimal valorTotalDistribuidora;

    @Column(precision = 19, scale = 2)
    private BigDecimal valorTotal;

    @Column(precision = 19, scale = 4)
    private BigDecimal consumoTotal;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaComImposto;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaSemImposto;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaDesconto;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoCreditos;

    private String linhaDigitavel;
    private String identificadorBoleto;
    private String instituicaoBoleto;

    // Novos campos com precisão corrigida para evitar falhas de inserção SQL
    @Column(precision = 19, scale = 2)
    private BigDecimal economiaGerada;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaEnergiaCompensada;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaConsumoLocal;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaEnergiaDistribuida;

    @Column(precision = 19, scale = 4)
    private BigDecimal saldoAcumulado;

    @Column(precision = 19, scale = 4)
    private BigDecimal consumoCompensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaConsumoCompensavel;

    @Column(precision = 19, scale = 4)
    private BigDecimal adicionalBandeira;

    @Column(precision = 19, scale = 4)
    private BigDecimal tarifaAdicionalBandeira;

    @OneToMany(mappedBy = "titulo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TituloItem> itens = new ArrayList<>();

    public void adicionarItem(String nome, BigDecimal valor, String descricao, TituloItemTipo tipo) {
        TituloItem ti = new TituloItem(this, nome, valor, descricao, tipo);
        itens.add(ti);
    }
}