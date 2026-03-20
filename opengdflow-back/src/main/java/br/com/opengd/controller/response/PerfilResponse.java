package br.com.opengd.controller.response;

import br.com.opengd.enums.PerfilTipo;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class PerfilResponse {
    private Long id;
    private String nome;
    private PerfilTipo tipo;
    private Set<PermissaoResponse> permissoes;
}
