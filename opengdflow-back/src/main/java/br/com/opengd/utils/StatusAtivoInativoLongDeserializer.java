package br.com.opengd.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

/**
 * Deserializa campo numérico legado (0/1) aceitando também valores textuais semânticos (ATIVO/INATIVO).
 * Mantém compatibilidade: response segue como número (Long), mas requests passam a aceitar as duas formas.
 */
public class StatusAtivoInativoLongDeserializer extends JsonDeserializer<Long> {

    @Override
    public Long deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonNode node = p.getCodec().readTree(p);
        if (node == null || node.isNull()) {
            return null;
        }

        if (node.isNumber()) {
            return node.longValue();
        }

        if (node.isTextual()) {
            return StatusAtivoInativoMapper.parseStatusAtivoInativoToLong(node.asText());
        }

        // fallback: tenta converter string genérica
        return StatusAtivoInativoMapper.parseStatusAtivoInativoToLong(node.asText());
    }
}

