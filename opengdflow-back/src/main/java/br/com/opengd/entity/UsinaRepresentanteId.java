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
public class UsinaRepresentanteId implements Serializable {

    @Column(name = "representante_id")
    private Long representanteId;

    @Column(name = "usina_id")
    private Long usinaId;

    // Construtores
    public UsinaRepresentanteId() {
    }

    public UsinaRepresentanteId(Long representanteId, Long usinaId) {
        this.representanteId = representanteId;
        this.usinaId = usinaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsinaRepresentanteId)) return false;
        UsinaRepresentanteId that = (UsinaRepresentanteId) o;
        return Objects.equals(representanteId, that.representanteId) &&
                Objects.equals(usinaId, that.usinaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(representanteId, usinaId);
    }
}