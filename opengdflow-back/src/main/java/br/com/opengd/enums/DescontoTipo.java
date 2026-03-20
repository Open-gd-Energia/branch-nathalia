package br.com.opengd.enums;

public enum DescontoTipo {
    VALOR_ENERGIA_COMPENSADA("Valor de Energia Compensada"),
    VALOR_ENERGIA_COMPENSADA_BANDEIRA("Valor de Energia Compensada + Bandeira Tarifária"),
    VALOR_ENERGIA_COM_IMPOSTOS("Valor de Energia com Impostos"),
    VALOR_ENERGIA_SEM_IMPOSTOS("Valor de Energia sem impostos"),
    TOTAL_COPEL("Valor Total da Fatura copel"),
    TARIFA_SEM_IMPOSTOS("Tarifa Sem Impostos"),
    TARIFA_COMPENSADA("Tarifa Compensada"),
    TARIFA_COMPENSADA_BANDEIRA(""),
    TARIFA_COM_IMPOSTOS("Tarifa com Impostos"),
    FATURA_COPEL("Fatura da Copel"),
    VALOR_FIXO("Valor Fixo"),
    ENERGIA_COMPENSADA("Energia Compensada"),
    ENERGIA_INJETADA("Energia Injetada"),
    ;

    String descricao;

    DescontoTipo(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
