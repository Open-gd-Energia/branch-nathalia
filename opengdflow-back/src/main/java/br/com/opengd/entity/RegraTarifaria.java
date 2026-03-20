package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "REGRA_TARIFARIA")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegraTarifaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal valor;
    private String descricao;
}
