package br.com.opengd.enums;

public enum ConsumidorClassificacao {
    B1_RESIDENCIAL("B1 Residencial"),
    B2_RURAL("B2 Rural"),
    B3_COMERCIAL("B3 Comercial"),
    ;

    String descricao;

    ConsumidorClassificacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
