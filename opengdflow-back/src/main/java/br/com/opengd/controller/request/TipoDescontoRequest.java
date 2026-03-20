package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TipoDescontoRequest {
    private String nome;
    private String descricao;
    private List<TipoDescontoItemResquest> itens;
}
