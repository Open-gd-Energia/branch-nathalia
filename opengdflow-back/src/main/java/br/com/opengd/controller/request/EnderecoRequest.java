package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EnderecoRequest {
    private CidadeRequest cidade;
    private String endereco;
    private String numero;
    private String complemento;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String cep;
    private String bairro;
}
