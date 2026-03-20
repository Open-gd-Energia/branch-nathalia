package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ContratoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private String descricao;
    private String url;
    private LocalDateTime dataHora;
    private Long tarifaValor;
    private Long status;
}
