package br.com.opengd.enums;

public enum PerfilTipo {
    ADMINISTRADOR("Administrador"),
    CONSUMIDOR("Consumidor"),
    USINA("Usina"),
    BACKOFFICE("Backoffice"),
    FINANCEIRO("Financeiro"),
    DADOS("Dados"),
    ;

    String descricao;

    PerfilTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
