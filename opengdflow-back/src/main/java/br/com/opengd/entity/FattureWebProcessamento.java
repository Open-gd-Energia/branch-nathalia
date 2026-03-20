package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "FATTUREWEB_PROCESSAMENTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FattureWebProcessamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dataProcessamento;
    private String path;
    private String method;
    private LocalDateTime dataAtualizacaoInicio;
    private LocalDateTime dataAtualizacaoFim;

    /** SUCESSO, ERRO, EM_ANDAMENTO - para auditoria e suporte */
    private String status;
    /** Mensagem de erro quando status=ERRO */
    @Column(columnDefinition = "TEXT")
    private String erro;
    /** Quantidade de faturas processadas com sucesso */
    private Integer totalProcessado;
    /** ID para correlacionar logs e rastreamento */
    @Column(name = "correlation_id", length = 64)
    private String correlationId;
}
