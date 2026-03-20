package br.com.opengd.integration.fattureweb.client;


import br.com.opengd.integration.fattureweb.dto.AuthDadosResponse;
import br.com.opengd.integration.fattureweb.dto.AuthRequest;
import br.com.opengd.integration.fattureweb.dto.AuthResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AuthClientMock implements AuthClient {

    @Override
    public AuthResponse login(AuthRequest request) {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setStatus("sucesso");
        authResponse.setMensagem("Autenticação OK.");
        AuthDadosResponse dadosResponse = new AuthDadosResponse();
        dadosResponse.setId(824L);
        dadosResponse.setEmail("edipocarneiro@gmail.com");
        dadosResponse.setTermo_aceito(true);
        dadosResponse.setPerfil_usuario_id(2L);
        dadosResponse.setEntidade_id(124L);
        dadosResponse.setToken("BeIMawM90PvhmjLG5HjdK0sifW/QMAFE4WjDRwowCq1GfvsHPNZkkSZmwWgD9PLd8CHY/biq6iysnvgKhMyuvUIfYBxOJxnQMb6ddOIQi+WHvb8wryLbx9ADPbHxqjEOkfjDyVODAXDgkGc/wiBDCpn5bULMB3TAXFKIMAVKjvkC0rim7s6Y1eSRgS7Nlimd5jNYdHj/IkH6T7onI6sPupzKSKok9HCE4XEq45L87vXfoAKujNEJQ/Ft444lPLjurkaE17NsTrjwmpfXRktCwiTD+X20giMQb0ZKqTO8OQh3QKO7qXpkxUPzeSkdPpDH84feqxn9YHquw6zt6t4NO/li8fk4FWPJ1BdXhOOtSWPdeUojIF/43nttNQMPfcCOnDCA4MCgNkA+b8Cu6M3lIHLkuf08v1DAUebLpvJlGVh/oS0pOMkyEOqTgkQUdAej");
        List<AuthDadosResponse> dadosResponseList = new ArrayList<>();
        dadosResponseList.add(dadosResponse);
        authResponse.setDados(dadosResponseList);
        return authResponse;
    }

    @Override
    public void logout(String token) {
        // Mock para o método logout (não faz nada)
        System.out.println("Logout mockado com sucesso para o token: " + token);
    }
}