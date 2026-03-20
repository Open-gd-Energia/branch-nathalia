package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaturamentoTipoRequest {
    private String nome;
    private String descricao;
    private String referencia;
}
