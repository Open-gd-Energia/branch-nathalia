package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UsuarioLogResponse {
    private Long id;
    private UsuarioDadosPrimariosResponse usuario;
    private LocalDateTime dataHora;
    private String evento;
    private String mensagem;
    private String origem;
}
