package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BancoResponse {
    private Long id;
    private String nome;
    private Long codigoBacen;
}
