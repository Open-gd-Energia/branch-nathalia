package br.com.opengd.controller.response;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Bloco 9: Regressão - campos sensíveis não devem aparecer na serialização JSON.
 */
class SensibleFieldsSerializationTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void consumidorResponse_naoSerializaSenhaDistribuidora() throws Exception {
        ConsumidorResponse r = new ConsumidorResponse();
        r.setId(1L);
        r.setNome("Teste");
        r.setSenhaDistribuidora("secret123");
        r.setLoginDistribuidora("user");

        String json = objectMapper.writeValueAsString(r);

        assertFalse(json.contains("senhaDistribuidora"));
        assertFalse(json.contains("secret123"));
        assertFalse(json.contains("loginDistribuidora"));
        assertFalse(json.contains("user"));
        assertTrue(json.contains("nome"));
        assertTrue(json.contains("Teste"));
    }

    @Test
    void usinaResponse_naoSerializaSenhaDistribuidora() throws Exception {
        UsinaResponse r = new UsinaResponse();
        r.setId(1L);
        r.setNome("Usina Teste");
        r.setSenhaDistribuidora("pwd456");
        r.setLoginDistribuidora("login");

        String json = objectMapper.writeValueAsString(r);

        assertFalse(json.contains("senhaDistribuidora"));
        assertFalse(json.contains("pwd456"));
        assertFalse(json.contains("loginDistribuidora"));
        assertFalse(json.contains("login"));
        assertTrue(json.contains("nome"));
    }
}
