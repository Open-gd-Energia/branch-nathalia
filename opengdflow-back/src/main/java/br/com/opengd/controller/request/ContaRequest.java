package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ContaRequest {
    @NotNull
    private IdRequest banco;
    @NotNull
    private String nomeTitular;
    @NotNull
    private String cpfCnpjTitular;
    @NotNull
    private String agencia;
    @NotNull
    private String dacAgencia;
    @NotNull
    private String conta;
    @NotNull
    private String dacConta;
    private String chavePix;
    private LocalDate dataAlteracao;
    private Long status;
}
