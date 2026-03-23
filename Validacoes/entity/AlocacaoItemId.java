package br.com.opengd.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AlocacaoItemId implements Serializable {

    @Column(name = "consumidor_id")
    private Long consumidorId;

    @Column(name = "alocacao_id")
    private Long alocacaoId;

    public AlocacaoItemId() {
    }

    public AlocacaoItemId(Long alocacaoId, Long consumidorId) {
        this.alocacaoId = alocacaoId;
        this.consumidorId = consumidorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AlocacaoItemId)) return false;
        AlocacaoItemId that = (AlocacaoItemId) o;
        return Objects.equals(alocacaoId, that.alocacaoId) &&
                Objects.equals(consumidorId, that.consumidorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(alocacaoId, consumidorId);
    }
}
