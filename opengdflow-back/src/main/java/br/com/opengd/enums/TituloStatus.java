package br.com.opengd.enums;

public enum TituloStatus {
    AGUARDANDO_FATURA("Aguardando Fatura"),
    FATURANDO("Faturando"),
    EM_ABERTO("Em Aberto"),
    PAGO("Pago"),
    VENCIDO("Vencido"),
    NAO_FATURADO("Não Faturado"),
    CANCELADO("Cancelado"),
    RASCUNHO("Rascunho"),
    ;

    String descricao;

    TituloStatus(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}



