package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "GERACAO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Geracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;
    private LocalDate mesReferencia;
    private BigDecimal valorConsumoInformado;
    private BigDecimal valorGeracaoInformado;
    private BigDecimal valorCreditoDistribuido;
    private BigDecimal valorEnergiaCompensada;
    private LocalDateTime dataCadastro;

}
