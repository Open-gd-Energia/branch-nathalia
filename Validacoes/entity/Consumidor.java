package br.com.opengd.entity;

import br.com.opengd.enums.*;
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
@Table(name = "CONSUMIDOR")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Consumidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "distribuidora_id", nullable = false)
    private Distribuidora distribuidora;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Endereco endereco;
    @OneToMany(mappedBy = "consumidor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsumidorRepresentante> representantes = new ArrayList<>();
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "representante_id", nullable = false)
    private Representante representanteTitular;
    private String nome;
    private String uc;
    @Enumerated(EnumType.STRING)
    private ConsumidorClassificacao classificacao;
    @Enumerated(EnumType.STRING)
    private ConsumidorTipo tipo;
    private BigDecimal geracaoPropria;
    private BigDecimal consumorReferenciaKwh;
    private String loginDistribuidora;
    private String senhaDistribuidora;
    private LocalDate dataAssinaturaContrato;
    @Enumerated(EnumType.STRING)
    private ConsumidorStatus status;
    @Enumerated(EnumType.STRING)
    private ConexaoTipo tipoConexao;

    public void adicionarRepresentante(Representante representante, ConsumidorRepresentanteRelacaoTipo relacao) {
        ConsumidorRepresentante cr = new ConsumidorRepresentante(representante, this, relacao);
        representantes.add(cr);
    }
}
