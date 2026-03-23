package br.com.opengd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USUARIO_USINA")
@IdClass(UsuarioUsinaId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioUsina {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usina_id", nullable = false)
    private Usina usina;

    private Boolean proprietario;
}