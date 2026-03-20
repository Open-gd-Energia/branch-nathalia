package br.com.opengd.integration.fattureweb.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AuthResponse {
    private String status;
    private String mensagem;
    private List<AuthDadosResponse> dados;
}
