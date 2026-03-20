package br.com.opengd.entity;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "CONSUMIDOR_REPRESENTANTE")
@Getter
@Setter
public class ConsumidorRepresentante {

    @EmbeddedId
    private ConsumidorRepresentanteId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("representanteId")
    @JoinColumn(name = "representante_id")
    private Representante representante;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("consumidorId")
    @JoinColumn(name = "consumidor_id")
    private Consumidor consumidor;

    private ConsumidorRepresentanteRelacaoTipo relacao;

    public ConsumidorRepresentante() {
    }

    public ConsumidorRepresentante(Representante representante, Consumidor consumidor, ConsumidorRepresentanteRelacaoTipo relacao) {
        this.representante = representante;
        this.consumidor = consumidor;
        this.relacao = relacao;
        this.id = new ConsumidorRepresentanteId(representante.getId(), consumidor.getId());
    }
}