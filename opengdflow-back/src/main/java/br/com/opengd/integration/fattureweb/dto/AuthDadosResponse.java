package br.com.opengd.integration.fattureweb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDadosResponse {
    private Long id;
    private String email;
    private Boolean termo_aceito;
    private Long perfil_usuario_id;
    private Long entidade_id;
    private String token;
}
