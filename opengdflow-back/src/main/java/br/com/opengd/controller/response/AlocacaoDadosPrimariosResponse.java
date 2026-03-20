package br.com.opengd.controller.response;

import br.com.opengd.enums.AlocacaoStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AlocacaoDadosPrimariosResponse {
    private Long id;
    private UsinaDadosPrimariosResponse usina;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFinal;
    private AlocacaoStatus status;
}
