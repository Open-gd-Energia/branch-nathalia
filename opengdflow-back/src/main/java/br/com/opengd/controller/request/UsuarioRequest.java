package br.com.opengd.controller.request;

import br.com.opengd.utils.StatusAtivoInativoLongDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class UsuarioRequest {
    @NotNull
    private String nome;
    private String celular;
    @NotNull
    private String email;
    private String senha;
    private String urlFoto;
    private Long sexo;
    @PastOrPresent(message = "Data de nascimento deve ser uma data passada ou presente")
    private LocalDate dataNascimento;

    @JsonDeserialize(using = StatusAtivoInativoLongDeserializer.class)
    private Long status;
    @NotNull
    private IdRequest perfil;
    private List<IdRequest> consumidores;
    private List<UsuarioUsinaRequest> usinas;
}
