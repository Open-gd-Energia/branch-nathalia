package br.com.opengd.controller.request;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Bloco 2: Regressão - DTOs aceitam nomes legados via @JsonAlias.
 */
class DtoCompatibilidadeRenameTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void consumidorRequest_aceitaConsumorReferenciaKwhLegado() throws Exception {
        String json = """
                {
                  "distribuidora": { "id": 1 },
                  "representanteTitular": { "id": 1 },
                  "nome": "Consumidor",
                  "consumorReferenciaKwh": 150.5
                }
                """;

        ConsumidorRequest r = objectMapper.readValue(json, ConsumidorRequest.class);

        assertNotNull(r.getConsumoReferenciaKwh());
        assertEquals(0, new BigDecimal("150.5").compareTo(r.getConsumoReferenciaKwh()));
    }

    @Test
    void consumidorRequest_aceitaConsumoReferenciaKwhNovo() throws Exception {
        String json = """
                {
                  "distribuidora": { "id": 1 },
                  "representanteTitular": { "id": 1 },
                  "nome": "Consumidor",
                  "consumoReferenciaKwh": 200.0
                }
                """;

        ConsumidorRequest r = objectMapper.readValue(json, ConsumidorRequest.class);

        assertNotNull(r.getConsumoReferenciaKwh());
        assertEquals(0, new BigDecimal("200.0").compareTo(r.getConsumoReferenciaKwh()));
    }

    @Test
    void usinaRequest_aceitaPontenciaPicoLegado() throws Exception {
        String json = """
                {
                  "nome": "Usina",
                  "pontenciaPico": 10.5
                }
                """;

        UsinaRequest r = objectMapper.readValue(json, UsinaRequest.class);

        assertNotNull(r.getPotenciaPico());
        assertEquals(0, new BigDecimal("10.5").compareTo(r.getPotenciaPico()));
    }
}
