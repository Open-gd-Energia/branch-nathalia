package br.com.opengd.controller.request;

import br.com.opengd.enums.TituloStatus;
import br.com.opengd.enums.TituloTipo;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class TituloRequest {
    private IdRequest tipoDescontoItem;
    private IdRequest usina;
    private IdRequest consumidor;
    private String identificador;
    private TituloTipo tipo;
    private LocalDate mesReferencia;
    private LocalDate dataVencimento;
    private LocalDate dataEmissao;
    private TituloStatus status;
    private String observacao;
    private BigDecimal energiaInjetada;
    private BigDecimal consumoLocal;
    private BigDecimal energiaCompensada;
    private BigDecimal energiaDistribuida;
    private BigDecimal valorTotalDistribuidora;
    private BigDecimal valorTotal;
    private BigDecimal consumoTotal;
    private BigDecimal tarifaComImposto;
    private BigDecimal tarifaSemImposto;
    private BigDecimal tarifaDesconto;
    private BigDecimal saldoCreditos;
    private String linhaDigitavel;
    private String identificadorBoleto;
    private String instituicaoBoleto;

    //Todo Campos novos https://linear.app/matozinho/issue/MAT-63/campos-novos-pro-aires-criar-titulos-cobranca#comment-99ed6647
    private BigDecimal economiaGerada;
    private BigDecimal tarifaEnergiaCompensada;
    private BigDecimal tarifaConsumoLocal;
    private BigDecimal tarifaEnergiaDistribuida;
    private BigDecimal saldoAcumulado;
    private BigDecimal consumoCompensavel;
    private BigDecimal tarifaConsumoCompensavel;
    private BigDecimal adicionalBandeira;
    private BigDecimal tarifaAdicionalBandeira;

    private List<TituloItemRequest> itens;
}
