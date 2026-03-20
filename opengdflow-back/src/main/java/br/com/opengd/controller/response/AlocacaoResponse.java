package br.com.opengd.controller.response;

import br.com.opengd.enums.AlocacaoStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AlocacaoResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private List<AlocacaoItemConsumidorResponse> itens = new ArrayList<>();
    private LocalDateTime dataInicio;
    private LocalDateTime dataFinal;
    private AlocacaoStatus status;
}
