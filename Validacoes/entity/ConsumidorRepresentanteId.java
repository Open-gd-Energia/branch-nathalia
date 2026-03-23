package br.com.opengd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ConsumidorRepresentanteId implements Serializable {

    @Column(name = "representante_id")
    private Long representanteId;

    @Column(name = "consumidor_id")
    private Long consumidorId;

    public ConsumidorRepresentanteId() {
    }

    public ConsumidorRepresentanteId(Long representanteId, Long consumidorId) {
        this.representanteId = representanteId;
        this.consumidorId = consumidorId;
    }

    // equals() e hashCode() obrigatórios
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConsumidorRepresentanteId)) return false;
        ConsumidorRepresentanteId that = (ConsumidorRepresentanteId) o;
        return Objects.equals(representanteId, that.representanteId) &&
                Objects.equals(consumidorId, that.consumidorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(representanteId, consumidorId);
    }
}