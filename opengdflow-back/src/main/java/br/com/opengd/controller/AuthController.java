package br.com.opengd.controller;

import br.com.opengd.controller.request.AuthForgotPasswordRequest;
import br.com.opengd.controller.request.AuthResetPasswordRequest;
import br.com.opengd.controller.request.LoginRequest;
import br.com.opengd.controller.response.BooleanResponse;
import br.com.opengd.controller.response.LoginResponse;
import br.com.opengd.entity.Permissao;
import br.com.opengd.entity.Usuario;
import br.com.opengd.entity.UsuarioResetPassword;
import br.com.opengd.exception.BusinessException;
import br.com.opengd.repository.UsuarioRepository;
import br.com.opengd.repository.UsuarioResetPasswordRepository;
import br.com.opengd.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
public class AuthController {

    private final JwtEncoder jwtEncoder;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioResetPasswordRepository usuarioResetPasswordRepository;
    private BCryptPasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthController(JwtEncoder jwtEncoder,
                          UsuarioRepository usuarioRepository, UsuarioResetPasswordRepository usuarioResetPasswordRepository,
                          BCryptPasswordEncoder passwordEncoder, EmailService emailService) {
        this.jwtEncoder = jwtEncoder;
        this.usuarioRepository = usuarioRepository;
        this.usuarioResetPasswordRepository = usuarioResetPasswordRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        var user = usuarioRepository.findByEmail(loginRequest.email());

        if (user.isEmpty()
                || !user.get().isLoginCorrect(loginRequest, passwordEncoder)
                || user.get().getStatus().equals(0L)) {
            throw new BadCredentialsException("Usuario ou senha invalida!");
        }

        var now = Instant.now();
        //Todo verificar se o tempo de expiração é adequado
        var expiresIn = 86400L; // 24 horas

        var scopes = user.get().getPerfil().getPermissoes()
                .stream()
                .map(Permissao::getNome)
                .collect(Collectors.joining(" "));

        var claims = JwtClaimsSet.builder()
                .issuer("server-backend")
                .subject(user.get().getId().toString())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresIn))
                .claim("scope", scopes)
                .build();

        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        return ResponseEntity.ok(new LoginResponse(jwtValue, expiresIn));
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody AuthForgotPasswordRequest request) throws BusinessException {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Email não encontrado!"));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(60);

        usuarioResetPasswordRepository.findByUsuario(usuario.getId().toString()).forEach(usuarioResetPasswordRepository::delete);
        UsuarioResetPassword usuarioResetPassword = new UsuarioResetPassword();
        usuarioResetPassword.setUsuario(usuario);
        usuarioResetPassword.setToken(token);
        usuarioResetPassword.setDataHoraExpiracao(expiration);
        usuarioResetPasswordRepository.save(usuarioResetPassword);

        try {
            emailService.sendResetCode(request.getEmail(), token, request.getUrlResetPassword());
        } catch (Exception e) {
            throw new BusinessException("Erro ao enviar o código de recuperação: " + e.getMessage());
        }


        return ResponseEntity.ok(new BooleanResponse("Código de recuperação enviado."));
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody AuthResetPasswordRequest request) throws BusinessException {
        String token = request.getToken();
        String novaSenha = request.getNovaSenha();
        List<UsuarioResetPassword> usuarioResetPasswordList = usuarioResetPasswordRepository.findByEmailAndToken(token);

        UsuarioResetPassword usuarioResetPassword = usuarioResetPasswordList.stream()
                .findFirst()
                .orElseThrow(() -> new BusinessException("Token inválido ou expirado"));
        Usuario usuario = usuarioResetPassword.getUsuario();
        usuario.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usuario);

        // Invalida o token
        usuarioResetPasswordRepository.delete(usuarioResetPassword);

        return ResponseEntity.ok(new BooleanResponse("Senha redefinida com sucesso"));
    }
}
