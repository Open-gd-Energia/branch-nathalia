package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "BANDEIRA_TARIFARIA")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BandeiraTarifaria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal adicional;
    private String cor;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.cor != null) {
            this.cor = this.cor.toUpperCase();
        }
    }
}
