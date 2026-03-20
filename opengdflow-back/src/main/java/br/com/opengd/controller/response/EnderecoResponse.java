package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoResponse {
    private Long id;
    private CidadeResponse cidade;
    private String endereco;
    private String numero;
    private String complemento;
    private java.math.BigDecimal latitude;
    private java.math.BigDecimal longitude;
    private String cep;
    private String bairro;
}
