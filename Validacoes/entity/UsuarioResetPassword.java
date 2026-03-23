package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "USUARIO_RESET_PASSWORD")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResetPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    private Usuario usuario;

    private String token;

    private LocalDateTime dataHoraExpiracao;
}