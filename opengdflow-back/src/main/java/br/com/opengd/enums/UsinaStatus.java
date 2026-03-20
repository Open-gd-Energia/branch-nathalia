package br.com.opengd.enums;

public enum UsinaStatus {
    ATIVO("Ativo"),
    INATIVO("Inativo"),
    EM_NEGOCIACAO("Em negociação"),
    TROCANDO_TITULARIDADE("Trocando Titularidade"),
    ;

    String descricao;

    UsinaStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
