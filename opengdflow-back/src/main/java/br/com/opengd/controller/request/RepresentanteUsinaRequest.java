package br.com.opengd.controller.request;

import br.com.opengd.enums.UsinaRepresentanteRelacaoTipo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteUsinaRequest {
    private IdRequest usina;
    private UsinaRepresentanteRelacaoTipo relacao;
}
