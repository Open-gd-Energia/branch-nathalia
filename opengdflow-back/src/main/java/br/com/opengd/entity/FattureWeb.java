package br.com.opengd.entity;

import br.com.opengd.utils.JsonNodeAttributeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.databind.JsonNode;


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
    @Convert(converter = JsonNodeAttributeConverter.class)
    private JsonNode json;
}
