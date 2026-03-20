package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteRepresentadoResponse {
    private RepresentanteDadosPrimariosResponse representado;
    private String relacao;
}
