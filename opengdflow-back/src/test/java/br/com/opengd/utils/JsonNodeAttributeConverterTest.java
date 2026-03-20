package br.com.opengd.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JsonNodeAttributeConverterTest {

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void roundTripJsonNode_preservesStructure() {
        JsonNodeAttributeConverter converter = new JsonNodeAttributeConverter();

        JsonNode original = assertDoesNotThrow(() ->
                mapper.readTree("""
                        {
                          "fatura_id": 123,
                          "distribuidora": "TESTE",
                          "outros": { "foo": "bar" }
                        }
                        """));

        String dbValue = converter.convertToDatabaseColumn(original);
        assertNotNull(dbValue);

        JsonNode readBack = converter.convertToEntityAttribute(dbValue);
        assertEquals(original, readBack);
    }

    @Test
    void converterReturnsNullForNullOrBlank() {
        JsonNodeAttributeConverter converter = new JsonNodeAttributeConverter();
        assertNull(converter.convertToDatabaseColumn(null));
        assertNull(converter.convertToEntityAttribute(null));
        assertNull(converter.convertToEntityAttribute("   "));
        assertNull(converter.convertToEntityAttribute(""));
    }
}

