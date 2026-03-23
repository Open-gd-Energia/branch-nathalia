package br.com.opengd.entity;

import br.com.opengd.enums.DescontoTipo;
import br.com.opengd.enums.DescontoValorTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "TIPO_DESCONTO_ITEM")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipoDescontoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_desconto_id", nullable = false)
    private TipoDesconto tipoDesconto;
    private DescontoTipo tipo;
    private DescontoValorTipo valorTipo;
    private BigDecimal valor;
}
