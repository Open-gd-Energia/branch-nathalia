package br.com.opengd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class RepresentanteRepresentadoId implements Serializable {

    @Column(name = "representante_id")
    private Long representanteId;

    @Column(name = "representado_id")
    private Long representadoId;

    // Construtores
    public RepresentanteRepresentadoId() {
    }

    public RepresentanteRepresentadoId(Long representanteId, Long representadoId) {
        this.representanteId = representanteId;
        this.representadoId = representadoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RepresentanteRepresentadoId)) return false;
        RepresentanteRepresentadoId that = (RepresentanteRepresentadoId) o;
        return Objects.equals(representanteId, that.representanteId) &&
                Objects.equals(representadoId, that.representadoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(representanteId, representadoId);
    }
}