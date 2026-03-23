package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "FATTUREWEB")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FattureWeb {

    @Id
    private Long id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Fatura fatura;
    private String idFattureWeb;
    @Column(columnDefinition = "jsonb")
    private String json;
}
