package br.com.opengd.entity;

import br.com.opengd.enums.Sexo;
import br.com.opengd.utils.UtilsOpenGD;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "PESSOA_FISICA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PessoaFisica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String rg;

    private String profissao;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private String nacionalidade;

    private String estadoCivil;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @PrePersist
    @PreUpdate
    public void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
        if (this.cpf != null) {
            this.cpf = UtilsOpenGD.apenasNumeros(this.cpf); // Remove todos os caracteres não numéricos
        }
        if (this.rg != null) {
            this.rg = UtilsOpenGD.apenasNumeros(this.rg); // Remove todos os caracteres não numéricos
        }
    }
}