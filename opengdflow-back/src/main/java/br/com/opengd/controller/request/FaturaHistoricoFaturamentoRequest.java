package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FaturaHistoricoFaturamentoRequest {
    private Long dias;
    private Long energiaAtiva;
    private LocalDate data;
}
