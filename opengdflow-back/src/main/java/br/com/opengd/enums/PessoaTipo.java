package br.com.opengd.enums;

public enum PessoaTipo {
    PESSOA_FISICA("Pessoa Fisica"),
    PESSOA_JURIDICA("Pessoa Juridica"),
    GESTORA("Gestora"),
    ;

    String descricao;

    PessoaTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
