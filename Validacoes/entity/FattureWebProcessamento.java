package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "FATTUREWEB_PROCESSAMENTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FattureWebProcessamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dataProcessamento;
    private String path;
    private String method;
    private LocalDateTime dataAtualizacaoInicio;
    private LocalDateTime dataAtualizacaoFim;
}
