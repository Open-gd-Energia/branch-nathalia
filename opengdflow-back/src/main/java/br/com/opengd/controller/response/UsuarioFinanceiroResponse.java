package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UsuarioFinanceiroResponse {
    private Long id;
    private Long banco;
    private String agencia;
    private String dacAgencia;
    private String conta;
    private String dacConta;
    private String chavePix;
    private LocalDate dataAlteracao;
    private Long status;
}
