package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name = "FATURA_HISTORICO_FATURAMENTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FaturaHistoricoFaturamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fatura_id", nullable = false)
    private Fatura fatura;
    private Long dias;
    private Long energiaAtiva;
    private LocalDate data;
}
