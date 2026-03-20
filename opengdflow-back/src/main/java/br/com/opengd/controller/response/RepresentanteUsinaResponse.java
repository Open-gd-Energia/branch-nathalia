package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteUsinaResponse {
    private UsinaDadosPrimariosResponse usina;
    private String relacao;
}
