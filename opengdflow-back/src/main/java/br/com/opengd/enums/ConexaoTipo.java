package br.com.opengd.enums;

public enum ConexaoTipo {
    MONOFASICO("Monofásico"),
    BIFASICO("Bifásico"),
    TRIFASICO("Trifasico"),
    ;

    String descricao;

    ConexaoTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
