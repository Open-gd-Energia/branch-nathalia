package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UsuarioLogRequest {
    @NotNull
    private IdRequest usuario;
    @NotNull
    private LocalDateTime dataHora;
    @NotNull
    private String evento;
    @NotNull
    private String mensagem;
    @NotNull
    private String origem;
}
