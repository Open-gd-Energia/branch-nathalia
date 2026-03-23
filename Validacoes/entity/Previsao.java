package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "PREVISAO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Previsao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;
    private LocalDate mesReferencia;
    private BigDecimal geracaoPrevista;
    private BigDecimal consumoPrevisto;
    private BigDecimal geracaoMediaPrevista;
    private BigDecimal consumoMedioPrevisto;
}
