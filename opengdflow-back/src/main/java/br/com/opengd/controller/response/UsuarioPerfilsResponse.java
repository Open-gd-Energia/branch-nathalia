package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class UsuarioPerfilsResponse {
    private String id;
    private String nome;
    private String celular;
    private String email;
    private String urlFoto;
    private Long sexo;
    private LocalDate dataNascimento;
    private LocalDate dataAlteracao;
    private Long status;
    private List<PerfilResponse> perfils;
}
