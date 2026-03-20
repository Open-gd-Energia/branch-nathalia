package br.com.opengd.controller.response;

import br.com.opengd.enums.PerfilTipo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PerfilPermissoesResponse {
    private Long id;
    private String nome;
    private PerfilTipo tipo;
    private List<PermissaoResponse> permissoes;
}
