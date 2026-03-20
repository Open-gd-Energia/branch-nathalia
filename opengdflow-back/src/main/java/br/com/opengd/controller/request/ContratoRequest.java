package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ContratoRequest {
    @NotNull
    private IdRequest usina;
    private String descricao;
    private String url;
    private LocalDateTime dataHora;
    private Long tarifaValor;
    private Long status;
}
