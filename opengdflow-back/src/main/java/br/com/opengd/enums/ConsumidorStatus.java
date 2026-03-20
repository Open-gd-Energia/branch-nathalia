package br.com.opengd.enums;

public enum ConsumidorStatus {
    ATIVO("Ativo"),
    INATIVO("Inativo"),
    AGUARDANDO_COMPENSACAO("Aguardando Compensação"),
    AGUARDANDO_DOCUMENTOS("Aguardando Documentos"),
    AGUARDANDO_GERADOR("Aguardando Gerador"),
    PROTOCOLADO("Protocolado"),
    ESGOTANDO_CREDITOS("Esgotando Créditos"),
    EM_NEGOCIACAO("Em Negociação"),
    ;

    String descricao;

    ConsumidorStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
