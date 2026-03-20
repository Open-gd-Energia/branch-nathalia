package br.com.opengd.integration.sicoob.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

//Documentação
//https://developers.sicoob.com.br/portal/apis

@Data
public class SicoobBoletoResponse {
    @JsonProperty("resultado")
    private Resultado resultado;

    @Data
    public static class Resultado {
        @JsonProperty("numeroCliente")
        private Long numeroCliente;

        @JsonProperty("codigoModalidade")
        private Integer codigoModalidade;

        @JsonProperty("numeroContaCorrente")
        private Long numeroContaCorrente;

        @JsonProperty("codigoEspecieDocumento")
        private String codigoEspecieDocumento;

        @JsonProperty("dataEmissao")
        private String dataEmissao;

        @JsonProperty("nossoNumero")
        private Long nossoNumero;

        @JsonProperty("seuNumero")
        private String seuNumero;

        @JsonProperty("identificacaoBoletoEmpresa")
        private String identificacaoBoletoEmpresa;

        @JsonProperty("codigoBarras")
        private String codigoBarras;

        @JsonProperty("linhaDigitavel")
        private String linhaDigitavel;

        @JsonProperty("identificacaoEmissaoBoleto")
        private Integer identificacaoEmissaoBoleto;

        @JsonProperty("identificacaoDistribuicaoBoleto")
        private Integer identificacaoDistribuicaoBoleto;

        @JsonProperty("valor")
        private BigDecimal valor;

        @JsonProperty("dataVencimento")
        private String dataVencimento;

        @JsonProperty("dataLimitePagamento")
        private String dataLimitePagamento;

        @JsonProperty("valorAbatimento")
        private BigDecimal valorAbatimento;

        @JsonProperty("tipoDesconto")
        private Integer tipoDesconto;

        @JsonProperty("dataPrimeiroDesconto")
        private String dataPrimeiroDesconto;

        @JsonProperty("valorPrimeiroDesconto")
        private BigDecimal valorPrimeiroDesconto;

        @JsonProperty("dataSegundoDesconto")
        private String dataSegundoDesconto;

        @JsonProperty("valorSegundoDesconto")
        private BigDecimal valorSegundoDesconto;

        @JsonProperty("dataTerceiroDesconto")
        private String dataTerceiroDesconto;

        @JsonProperty("valorTerceiroDesconto")
        private BigDecimal valorTerceiroDesconto;

        @JsonProperty("tipoMulta")
        private Integer tipoMulta;

        @JsonProperty("dataMulta")
        private String dataMulta;

        @JsonProperty("valorMulta")
        private BigDecimal valorMulta;

        @JsonProperty("tipoJurosMora")
        private Integer tipoJurosMora;

        @JsonProperty("dataJurosMora")
        private String dataJurosMora;

        @JsonProperty("valorJurosMora")
        private BigDecimal valorJurosMora;

        @JsonProperty("numeroParcela")
        private Integer numeroParcela;

        @JsonProperty("aceite")
        private Boolean aceite;

        @JsonProperty("codigoNegativacao")
        private Integer codigoNegativacao;

        @JsonProperty("numeroDiasNegativacao")
        private Integer numeroDiasNegativacao;

        @JsonProperty("codigoProtesto")
        private Integer codigoProtesto;

        @JsonProperty("numeroDiasProtesto")
        private Integer numeroDiasProtesto;

        @JsonProperty("quantidadeDiasFloat")
        private Integer quantidadeDiasFloat;

        @JsonProperty("pagador")
        private Pagador pagador;

        @JsonProperty("beneficiarioFinal")
        private BeneficiarioFinal beneficiarioFinal;

        @JsonProperty("mensagensInstrucao")
        private List<String> mensagensInstrucao;

        @JsonProperty("rateioCreditos")
        private List<RateioCredito> rateioCreditos;

        @JsonProperty("pdfBoleto")
        private String pdfBoleto; // Base64

        @JsonProperty("qrCode")
        private String qrCode;

        @JsonProperty("numeroContratoCobranca")
        private Integer numeroContratoCobranca;

        @JsonProperty("descricaoRejeicaoPix")
        private String descricaoRejeicaoPix;
    }

    @Data
    public static class Pagador {
        @JsonProperty("numeroCpfCnpj")
        private String numeroCpfCnpj;

        @JsonProperty("nome")
        private String nome;

        @JsonProperty("endereco")
        private String endereco;

        @JsonProperty("bairro")
        private String bairro;

        @JsonProperty("cidade")
        private String cidade;

        @JsonProperty("cep")
        private String cep;

        @JsonProperty("uf")
        private String uf;

        @JsonProperty("email")
        private String email;
    }

    @Data
    public static class BeneficiarioFinal {
        @JsonProperty("numeroCpfCnpj")
        private String numeroCpfCnpj;

        @JsonProperty("nome")
        private String nome;
    }

    @Data
    public static class RateioCredito {
        @JsonProperty("numeroBanco")
        private Integer numeroBanco;

        @JsonProperty("numeroAgencia")
        private Integer numeroAgencia;

        @JsonProperty("numeroContaCorrente")
        private String numeroContaCorrente;

        @JsonProperty("contaPrincipal")
        private Boolean contaPrincipal;

        @JsonProperty("codigoTipoValorRateio")
        private Integer codigoTipoValorRateio;

        @JsonProperty("valorRateio")
        private BigDecimal valorRateio;

        @JsonProperty("codigoTipoCalculoRateio")
        private Integer codigoTipoCalculoRateio;

        @JsonProperty("numeroCpfCnpjTitular")
        private String numeroCpfCnpjTitular;

        @JsonProperty("nomeTitular")
        private String nomeTitular;

        @JsonProperty("codigoFinalidadeTed")
        private String codigoFinalidadeTed;

        @JsonProperty("codigoTipoContaDestinoTed")
        private String codigoTipoContaDestinoTed;

        @JsonProperty("quantidadeDiasFloat")
        private Integer quantidadeDiasFloat;

        @JsonProperty("dataFloatCredito")
        private String dataFloatCredito;
    }
}
