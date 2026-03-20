package br.com.opengd.enums;

public enum TensaoConexaoTipo {
    ALTA_TENSAO("Alta Tensão"),
    BAIXA_TENSAO("Baixa Tensão"),
    ;

    String descricao;

    TensaoConexaoTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
