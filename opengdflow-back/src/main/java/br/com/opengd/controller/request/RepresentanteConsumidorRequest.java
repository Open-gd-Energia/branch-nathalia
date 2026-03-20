package br.com.opengd.controller.request;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteConsumidorRequest {
    private IdRequest consumidor;
    private ConsumidorRepresentanteRelacaoTipo relacao;
    private Boolean titular;
}
