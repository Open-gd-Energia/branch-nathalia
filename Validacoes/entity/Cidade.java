package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "CIDADE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String idIbge;
    private String nome;
    private String uf;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
        if (this.uf != null) {
            this.uf = this.uf.toUpperCase();
        }
    }
}
