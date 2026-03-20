package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthResetPasswordRequest {
    @NotNull(message = "O token não pode ser nulo.")
    @NotBlank(message = "O token não pode estar vazio.")
    private String token;
    @NotNull(message = "O novaSenha não pode ser nulo.")
    @NotBlank(message = "O novaSenha não pode estar vazio.")
    private String novaSenha;
}
