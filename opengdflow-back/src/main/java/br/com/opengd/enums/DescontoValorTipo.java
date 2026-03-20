package br.com.opengd.enums;

public enum DescontoValorTipo {
    FIXO("R$"),
    PERCENTUAL("%"),
    ;

    String descricao;

    DescontoValorTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
