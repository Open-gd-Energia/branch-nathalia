package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class UsuarioResponse {
    private String id;
    private String nome;
    private String celular;
    private String email;
    private String urlFoto;
    private Long sexo;
    private LocalDate dataNascimento;
    private LocalDateTime dataAlteracao;
    private Long status;
    private PerfilResponse perfil;
    private List<ConsumidorResponse> consumidores;
    private List<UsuarioUsinaResponse> usinas;
}
