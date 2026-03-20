package br.com.opengd.integration.fattureweb.client;

import br.com.opengd.integration.fattureweb.dto.AuthRequest;
import br.com.opengd.integration.fattureweb.dto.AuthResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "authClient", url = "https://api.fattureweb.com.br")
public interface AuthClient {

    @PostMapping("/auth/login")
    AuthResponse login(@RequestBody AuthRequest request);

    @PostMapping("/auth/logout")
    void logout(@RequestHeader("Fatture-AuthToken") String token);
}