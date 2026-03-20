package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteRepresentadoRequest {
    private IdRequest representado;
    private String relacao;
}
