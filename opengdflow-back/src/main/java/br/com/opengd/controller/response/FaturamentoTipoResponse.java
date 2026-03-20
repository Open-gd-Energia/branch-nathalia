package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaturamentoTipoResponse {
    private Long id;
    private String nome;
    private String descricao;
    private String referencia;
}
