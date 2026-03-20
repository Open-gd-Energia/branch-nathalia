package br.com.opengd.enums;

public enum ConsumidorRepresentanteRelacaoTipo {
    CONTATO("Contato"),
    OPERADOR("Operador"),
    TESTEMUNHA("Testemunha"),
    RESPONSAVEL_LEGAL("Responsável Legal"),
    SOCIO("Sócio"),
    SOCIO_ADMINISTRADOR("Sócio Administrador"),
    COMISSIONADO("Comissionado"),
    GESTORA("Gestora"),
    ;

    String descricao;

    ConsumidorRepresentanteRelacaoTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
