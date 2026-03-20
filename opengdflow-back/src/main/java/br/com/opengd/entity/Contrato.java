package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "CONTRATO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;
    private String descricao;
    private String url;
    private LocalDateTime dataHora;
    private Long tarifaValor;
    private Long status;
}
