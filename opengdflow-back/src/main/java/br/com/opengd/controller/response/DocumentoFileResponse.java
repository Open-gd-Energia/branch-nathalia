package br.com.opengd.controller.response;

import br.com.opengd.enums.DocumentoHost;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DocumentoFileResponse {
    private Long id;
    private String nome;
    private String descricao;
    private Long tamanho;
    private String tipo;
    private String url;
    private LocalDateTime dataHora;
    private DocumentoHost host;
    private String base64;
}
