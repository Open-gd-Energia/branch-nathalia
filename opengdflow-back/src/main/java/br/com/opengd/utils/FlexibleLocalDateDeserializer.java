package br.com.opengd.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.time.LocalDate;

/**
 * Aceita tanto "yyyy-MM-dd" quanto ISO datetime (ex.: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
 * convertendo para LocalDate através dos 10 primeiros caracteres.
 */
public class FlexibleLocalDateDeserializer extends JsonDeserializer<LocalDate> {

    @Override
    public LocalDate deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonNode node = p.getCodec().readTree(p);
        if (node == null || node.isNull()) {
            return null;
        }

        if (node.isTextual()) {
            String raw = node.asText();
            if (raw == null) return null;
            String s = raw.trim();
            if (s.isEmpty()) return null;

            // ISO datetime -> pega só a parte date
            if (s.length() >= 10) {
                String datePart = s.substring(0, 10);
                return LocalDate.parse(datePart);
            }

            return LocalDate.parse(s);
        }

        // fallback: se for numérico, não há padrão confiável -> falha explícita
        return null;
    }
}

