package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "IRRADIACAO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Irradiacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;
    private LocalDate data;
    private BigDecimal valor;
}
