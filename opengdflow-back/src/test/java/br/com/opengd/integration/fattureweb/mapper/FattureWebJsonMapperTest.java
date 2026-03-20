package br.com.opengd.integration.fattureweb.mapper;

import br.com.opengd.integration.fattureweb.dto.conteudo.DadosDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Bloco 10: Regressão do mapeamento DadosDTO <-> JsonNode.
 */
class FattureWebJsonMapperTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void toJsonNode_nullRetornaNull() {
        assertNull(FattureWebJsonMapper.toJsonNode(null, objectMapper));
    }

    @Test
    void toJsonNode_dadosDTOProduzJsonNodeValido() {
        DadosDTO dto = new DadosDTO();
        dto.setFaturaId(123L);
        dto.setDistribuidora("CPFL");

        JsonNode node = FattureWebJsonMapper.toJsonNode(dto, objectMapper);

        assertNotNull(node);
        assertTrue(node.has("fatura_id"));
        assertEquals(123, node.get("fatura_id").asInt());
        assertTrue(node.has("distribuidora"));
        assertEquals("CPFL", node.get("distribuidora").asText());
    }

    @Test
    void toDadosDTO_nullRetornaNull() {
        assertNull(FattureWebJsonMapper.toDadosDTO(null, objectMapper));
    }

    @Test
    void roundTrip_dadosDTOIdempotente() {
        DadosDTO original = new DadosDTO();
        original.setFaturaId(456L);
        original.setDistribuidora("Enel");

        JsonNode node = FattureWebJsonMapper.toJsonNode(original, objectMapper);
        DadosDTO restaurado = FattureWebJsonMapper.toDadosDTO(node, objectMapper);

        assertNotNull(restaurado);
        assertEquals(original.getFaturaId(), restaurado.getFaturaId());
        assertEquals(original.getDistribuidora(), restaurado.getDistribuidora());
    }
}
