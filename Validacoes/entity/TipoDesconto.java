package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TIPO_DESCONTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipoDesconto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @OneToMany(mappedBy = "tipoDesconto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<TipoDescontoItem> itens = new ArrayList<>();

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
    }
}
