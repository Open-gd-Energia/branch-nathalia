package br.com.opengd.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DocumentoRequest {
    private IdRequest usina;
    private IdRequest consumidor;
    private IdRequest representante;
    private IdRequest usuario;
    private String descricao;
    private String nome;
    private String tipo;
    private Long tamanho;
    private String base64;
}
