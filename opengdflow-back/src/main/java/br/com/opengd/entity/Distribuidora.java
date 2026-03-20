package br.com.opengd.entity;

import br.com.opengd.utils.UtilsOpenGD;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DISTRIBUIDORA")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Distribuidora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sigla;
    private Long status;
    private String url;
    private String cnpj;

    @PrePersist
    @PreUpdate
    public void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
        if (this.sigla != null) {
            this.sigla = this.sigla.toUpperCase();
        }
        if (this.cnpj != null) {
            this.cnpj = UtilsOpenGD.apenasNumeros(this.cnpj); // Remove todos os caracteres não numéricos
        }
    }
}
