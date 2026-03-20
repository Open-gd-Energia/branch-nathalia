package br.com.opengd.enums;

public enum TituloItemTipo {
    DESCONTO("Desconto"),
    ACRESCIMO("Acréscimo"),
    ;

    String descricao;

    TituloItemTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
