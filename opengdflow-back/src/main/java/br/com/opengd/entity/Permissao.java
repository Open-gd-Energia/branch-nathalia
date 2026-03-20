package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PERMISSAO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
    }
}
