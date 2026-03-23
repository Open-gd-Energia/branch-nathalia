package br.com.opengd.entity;

import br.com.opengd.enums.PerfilTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "PERFIL")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private PerfilTipo tipo;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Permissao> permissoes = new HashSet<>();

//    @PrePersist
//    @PreUpdate
//    private void padronizar() {
//        if (this.nome != null) {
//            this.nome = this.nome.toUpperCase();
//        }
//    }
}
