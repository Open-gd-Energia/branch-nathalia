package br.com.opengd.integration.fattureweb.dto.conteudo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class UnidadeconsumidoraDTO {

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("cpf_cnpj")
    private String cpfCnpj;

    @JsonProperty("endereco")
    private String endereco;

    //UC do consumidor
    @JsonProperty("instalacao")
    private String instalacao;

    @JsonProperty("tipo_ligacao")
    private String tipoLigacao;

    @JsonProperty("limite_tensao")
    private String limiteTensao;

    @JsonProperty("tipo_contrato")
    private String tipoContrato;

    @JsonProperty("tensao_nominal")
    private String tensaoNominal;

    @JsonProperty("categoria_tensao")
    private String categoriaTensao;

    @JsonProperty("inscricao_estadual")
    private String inscricaoEstadual;

    @JsonProperty("subgrupo")
    private String subgrupo;

    @JsonProperty("numero_uc")
    private String numeroUc;

}
