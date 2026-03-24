package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class DocumentoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private ConsumidorDadosPrimariosResponse consumidor;
    private RepresentanteDadosPrimariosResponse representante;
    private UsuarioDadosPrimariosResponse usuario;
    private String nome;
    private String descricao;
    private BigDecimal tamanho;
    private String tipo;
    private LocalDateTime dataHora;
}
