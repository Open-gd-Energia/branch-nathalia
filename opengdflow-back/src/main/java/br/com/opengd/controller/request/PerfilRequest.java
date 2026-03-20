package br.com.opengd.controller.request;

import br.com.opengd.enums.PerfilTipo;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class PerfilRequest {
    private String nome;
    private PerfilTipo tipo;
    private Set<IdRequest> permissoes;
}
