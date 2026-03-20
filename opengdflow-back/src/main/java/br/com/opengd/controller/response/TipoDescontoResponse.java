package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TipoDescontoResponse {
    private Long id;
    private String nome;
    private String descricao;
    private List<TipoDescontoItemResponse> itens;
}
