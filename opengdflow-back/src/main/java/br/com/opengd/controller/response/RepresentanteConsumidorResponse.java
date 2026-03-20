package br.com.opengd.controller.response;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RepresentanteConsumidorResponse {
    private ConsumidorDadosPrimariosResponse consumidor;
    private ConsumidorRepresentanteRelacaoTipo relacao;
    private Boolean titular;
}
