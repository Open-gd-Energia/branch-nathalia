package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "CONTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "banco_id", nullable = false)
    private Banco banco;

    private String nomeTitular;

    private String cpfCnpjTitular;

    private String agencia;

    private String dacAgencia;

    private String conta;

    private String dacConta;

    private String chavePix;

    private LocalDate dataAlteracao;

    private Long status;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.agencia != null) {
            this.agencia = this.agencia.toUpperCase();
        }
        if (this.dacAgencia != null) {
            this.dacAgencia = this.dacAgencia.toUpperCase();
        }
        if (this.conta != null) {
            this.conta = this.conta.toUpperCase();
        }
        if (this.dacConta != null) {
            this.dacConta = this.dacConta.toUpperCase();
        }
        if (this.chavePix != null) {
            this.chavePix = this.chavePix.toUpperCase();
        }
    }
}