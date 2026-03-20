package br.com.opengd.controller.response;

import br.com.opengd.enums.UsinaRepresentanteRelacaoTipo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsinaRespresentanteResponse {
    private RepresentanteDadosPrimariosResponse representante;
    private UsinaRepresentanteRelacaoTipo relacao;
}
