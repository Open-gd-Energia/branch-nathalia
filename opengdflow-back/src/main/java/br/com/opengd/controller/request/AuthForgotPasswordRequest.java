package br.com.opengd.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthForgotPasswordRequest {
    @NotNull(message = "O email não pode ser nulo.")
    @NotBlank(message = "O email não pode estar vazio.")
    private String email;

    private String urlResetPassword;
}
