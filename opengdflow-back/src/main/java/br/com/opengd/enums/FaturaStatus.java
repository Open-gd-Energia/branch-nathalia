package br.com.opengd.enums;

public enum FaturaStatus {
    PROCESSADA("Processada"),
    EM_PROCESSAMENTO("Em Processamento"),
    ERRO("Erro"),
    ;

    String descricao;

    FaturaStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
