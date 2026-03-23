package br.com.opengd.entity;

import br.com.opengd.enums.AlocacaoStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ALOCACAO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alocacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;
    @OneToMany(mappedBy = "alocacao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AlocacaoItem> itens = new ArrayList<>();
    private LocalDateTime dataInicio;
    private LocalDateTime dataFinal;
    @Enumerated(EnumType.STRING)
    private AlocacaoStatus status;

    public void adicionarItem(Consumidor consumidor, BigDecimal consumo, BigDecimal consumoRef, BigDecimal quota, BigDecimal quotaExcedente) {
        AlocacaoItem ai = new AlocacaoItem(consumidor, this, consumo, consumoRef, quota, quotaExcedente);
        itens.add(ai);
    }
}
