package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "BANCO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Banco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", columnDefinition = "VARCHAR(255)")
    private String nome;

    @Column(name = "codigo_bacen")
    private Long codigoBacen;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
    }
}