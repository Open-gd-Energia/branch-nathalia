package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PermissaoResponse {
    private Long id;
    private String nome;
    private String descricao;
}
