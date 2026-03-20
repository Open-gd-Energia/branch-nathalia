package br.com.opengd.enums;

public enum UsinaClassificacao {
    B1_RESIDENCIAL("B1 Residencial"),
    B2_RURAL("B2 Rural"),
    B3_INDUSTRIAL_COMERCIAL("B3 Industrial/Comercial"),
    A4("A4 (2.3 25kV)"),
    A3A("A3a (30 a 44kV)"),
    ;

    String descricao;

    UsinaClassificacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
