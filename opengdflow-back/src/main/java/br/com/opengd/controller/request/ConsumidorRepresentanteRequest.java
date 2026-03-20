package br.com.opengd.controller.request;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsumidorRepresentanteRequest {
    @NotNull
    private IdRequest representante;
    private ConsumidorRepresentanteRelacaoTipo relacao;
}
