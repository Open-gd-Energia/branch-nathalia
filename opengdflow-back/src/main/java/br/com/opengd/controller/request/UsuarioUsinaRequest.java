package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioUsinaRequest {
    @NotNull
    private IdRequest usina;
    @NotNull
    private Boolean proprietario;
}
