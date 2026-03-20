package br.com.opengd.enums;

public enum AlocacaoStatus {
    ATIVO("Ativo"),
    INATIVO("Inativo"),
    AGUARDANDO_PROTOCOLO("Aguardando Protocolo"),
    SENDO_SUBSTITUIDO("Sendo Substituido"),
    ;

    String descricao;

    AlocacaoStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
