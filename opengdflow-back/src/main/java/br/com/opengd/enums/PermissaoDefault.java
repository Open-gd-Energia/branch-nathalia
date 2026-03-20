package br.com.opengd.enums;

public enum PermissaoDefault {
    ADMIN("Administrador"),
    ALOCACAO("Alocação"),
    COBRANCA("Cobrança"),
    CONSUMO("Consumo"),
    DADOS("Dados"),
    DASHBOARD("Dasbhboard"),
    FATURAS("Faturas"),
    GERACAO("Geração"),
    NOTIFICACAO("Notificação"),
    PESSOAS("Pessoas"),
    ;

    String descricao;

    PermissaoDefault(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
