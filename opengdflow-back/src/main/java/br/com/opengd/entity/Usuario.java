package br.com.opengd.entity;

import br.com.opengd.controller.request.LoginRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "USUARIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    private Endereco endereco;

    private String nome;

    private String celular;

    private String email;

    @JsonIgnore
    private String senha;

    private String urlFoto;

    private Long sexo;

    private LocalDate dataNascimento;

    private LocalDateTime dataAlteracao;

    private Long status;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UsuarioUsina> usinas;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "perfil_id", nullable = false)
    private Perfil perfil;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "usuario_consumidores",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "consumidores_id")
    )
    private Set<Consumidor> consumidores;

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(loginRequest.senha(), this.senha);
    }

    @PrePersist
    @PreUpdate
    private void padronizar() {
        if (this.nome != null) {
            this.nome = this.nome.toUpperCase();
        }
        if (this.email != null) {
            this.email = this.email.toLowerCase();
        }
        this.dataAlteracao = LocalDateTime.now();
    }
}