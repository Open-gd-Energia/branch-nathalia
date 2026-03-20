package br.com.opengd.entity;

import br.com.opengd.enums.TituloItemTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TITULO_ITEM")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TituloItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "titulo_id", nullable = false)
    private Titulo titulo;
    private String nome;
    private BigDecimal valor;
    private String descricao;
    @Enumerated(EnumType.STRING)
    private TituloItemTipo tipo;

    public TituloItem(Titulo titulo, String nome, BigDecimal valor, String descricao, TituloItemTipo tipo) {
        this.titulo = titulo;
        this.nome = nome;
        this.valor = valor;
        this.descricao = descricao;
        this.tipo = tipo;
    }
}
