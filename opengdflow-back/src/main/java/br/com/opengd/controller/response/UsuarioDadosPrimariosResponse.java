package br.com.opengd.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class UsuarioDadosPrimariosResponse {
    private String id;
    private String nome;
    private String celular;
    private String email;
    private String urlFoto;
    private Long sexo;
    private LocalDate dataNascimento;
    private LocalDateTime dataAlteracao;
    private Long status;
}
