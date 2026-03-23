package br.com.opengd.entity;

import java.io.Serializable;
import java.util.Objects;

public class UsuarioUsinaId implements Serializable {

    private Long usuario;
    private Long usina;

    public UsuarioUsinaId() {
    }

    public UsuarioUsinaId(Long usuario, Long usina) {
        this.usuario = usuario;
        this.usina = usina;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UsuarioUsinaId)) return false;
        UsuarioUsinaId that = (UsuarioUsinaId) o;
        return Objects.equals(usuario, that.usuario) &&
                Objects.equals(usina, that.usina);
    }

    @Override
    public int hashCode() {
        return Objects.hash(usuario, usina);
    }
}
