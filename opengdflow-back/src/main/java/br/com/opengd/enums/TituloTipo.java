package br.com.opengd.enums;

public enum TituloTipo {
    PAGAR("Pagar"),
    RECEBER("Receber"),
    ;

    String descricao;

    TituloTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
