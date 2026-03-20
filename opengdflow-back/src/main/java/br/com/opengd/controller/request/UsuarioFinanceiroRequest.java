package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioFinanceiroRequest {
    private Long banco;
    private String agencia;
    private String dacAgencia;
    private String conta;
    private String dacConta;
    private String chavePix;
}
