package br.com.opengd.entity;

import br.com.opengd.enums.UsinaRepresentanteRelacaoTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USINA_REPRESENTANTE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsinaRepresentante {

    @EmbeddedId
    private UsinaRepresentanteId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("representanteId")
    @JoinColumn(name = "representante_id")
    private Representante representante;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("usinaId")
    @JoinColumn(name = "usina_id")
    private Usina usina;

    private UsinaRepresentanteRelacaoTipo relacao;

    public UsinaRepresentante(Representante representante, Usina usina, UsinaRepresentanteRelacaoTipo relacao) {
        this.representante = representante;
        this.usina = usina;
        this.relacao = relacao;
        this.id = new UsinaRepresentanteId(representante.getId(), usina.getId());
    }
}