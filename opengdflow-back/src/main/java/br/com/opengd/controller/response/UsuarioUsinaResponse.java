package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioUsinaResponse {
    private UsinaDadosPrimariosResponse usina;
    private Boolean proprietario;
}
