package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "ALOCACAO_ITEM")
@Getter
@Setter
public class AlocacaoItem {

    @EmbeddedId
    private AlocacaoItemId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("consumidorId")
    @JoinColumn(name = "consumidor_id")
    private Consumidor consumidor;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("alocacaoId")
    @JoinColumn(name = "alocacao_id")
    private Alocacao alocacao;

    private BigDecimal consumo;
    private BigDecimal consumoRef;
    private BigDecimal quota;
    private BigDecimal quotaExcedente;

    public AlocacaoItem() {
    }

    public AlocacaoItem(Consumidor consumidor, Alocacao alocacao, BigDecimal consumo, BigDecimal consumoRef, BigDecimal quota, BigDecimal quotaExcedente) {
        this.consumidor = consumidor;
        this.alocacao = alocacao;
        this.consumo = consumo;
        this.consumoRef = consumoRef;
        this.quota = quota;
        this.quotaExcedente = quotaExcedente;
        this.id = new AlocacaoItemId(alocacao.getId(), consumidor.getId());
    }
}
