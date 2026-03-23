package br.com.opengd.entity;

import br.com.opengd.utils.UtilsOpenGD;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PESSOA_JURIDICA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PessoaJuridica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razaoSocial;

    private String nomeFantasia;

    private String cnpj;

    private String inscricaoEstadual;

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.razaoSocial != null) {
            this.razaoSocial = this.razaoSocial.toUpperCase();
        }
        if (this.nomeFantasia != null) {
            this.nomeFantasia = this.nomeFantasia.toUpperCase();
        }
        if (this.cnpj != null) {
            this.cnpj = UtilsOpenGD.apenasAlfanumerico(this.cnpj);
        }
        if (this.inscricaoEstadual != null) {
            this.inscricaoEstadual = this.inscricaoEstadual.toUpperCase();
        }
    }
}