package br.com.opengd.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;

/**
 * Mantem compatibilidade de persistencia: o campo continua sendo armazenado como String
 * (que o PostgreSQL consegue converter para jsonb). Em runtime, expomos como JsonNode.
 */
@Converter
public class JsonNodeAttributeConverter implements AttributeConverter<JsonNode, String> {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode attribute) {
        if (attribute == null) {
            return null;
        }
        try {
            return OBJECT_MAPPER.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Falha ao serializar JsonNode para coluna jsonb", e);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        String trimmed = dbData.trim();
        if (trimmed.isEmpty()) {
            return null;
        }
        try {
            return OBJECT_MAPPER.readTree(trimmed);
        } catch (IOException e) {
            throw new IllegalArgumentException("Falha ao desserializar coluna jsonb para JsonNode", e);
        }
    }
}

