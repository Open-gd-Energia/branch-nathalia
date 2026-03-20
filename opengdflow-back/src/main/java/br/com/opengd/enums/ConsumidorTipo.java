package br.com.opengd.enums;

public enum ConsumidorTipo {
    AUTOCONSUMO("Autoconsumo"),
    GERACAO_COMPARTILHADA("Geração Compartilhada"),
    ;

    String descricao;

    ConsumidorTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
