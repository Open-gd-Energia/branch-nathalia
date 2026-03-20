package br.com.opengd.entity;

import br.com.opengd.enums.ConsumidorRepresentanteRelacaoTipo;
import br.com.opengd.enums.PessoaTipo;
import br.com.opengd.enums.UsinaRepresentanteRelacaoTipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "REPRESENTANTE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Representante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Endereco endereco;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private PessoaFisica pessoaFisica;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private PessoaJuridica pessoaJuridica;

    @Enumerated(EnumType.STRING)
    private PessoaTipo tipoPessoa;

    private String telefone;

    private String email;

    @Enumerated(EnumType.STRING)
    private ConsumidorRepresentanteRelacaoTipo tipoRelacao;

    private LocalDateTime dataAlteracao;

    private Long status;

    @OneToMany(mappedBy = "representante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UsinaRepresentante> usinas;

    @OneToMany(mappedBy = "representante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConsumidorRepresentante> consumidores = new ArrayList<>();

    public void adicionarConsumidor(Consumidor consumidor, ConsumidorRepresentanteRelacaoTipo relacao) {
        ConsumidorRepresentante cr = new ConsumidorRepresentante(this, consumidor, relacao);
        consumidores.add(cr);
    }

    public void adicionarUsina(Usina usina, UsinaRepresentanteRelacaoTipo relacao) {
        UsinaRepresentante ur = new UsinaRepresentante(this, usina, relacao);
        usinas.add(ur);
    }

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.email != null) {
            this.email = this.email.toLowerCase();
        }
        this.dataAlteracao = LocalDateTime.now();
    }
}