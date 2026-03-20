package br.com.opengd.entity;

import br.com.opengd.enums.DocumentoHost;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "DOCUMENTO")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usina_id", nullable = true)
    private Usina usina;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "consumidor_id", nullable = true)
    private Consumidor consumidor;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "representante_id", nullable = true)
    private Representante representante;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = true)
    private Usuario usuario;
    private String nome;
    private String descricao;
    private Long tamanho;
    private String tipo;
    private LocalDateTime dataHora;
    private DocumentoHost host;
    private String url;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        this.dataHora = LocalDateTime.now();
    }
}
