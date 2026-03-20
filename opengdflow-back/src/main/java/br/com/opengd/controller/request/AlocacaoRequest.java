package br.com.opengd.controller.request;

import br.com.opengd.enums.AlocacaoStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AlocacaoRequest {
    @NotNull
    private IdRequest usina;
    @Valid
    @NotNull
    private List<AlocacaoItemRequest> itens = new ArrayList<>();
    private LocalDateTime dataInicio;
    private LocalDateTime dataFinal;
    private AlocacaoStatus status;
}
