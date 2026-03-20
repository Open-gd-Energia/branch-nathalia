package br.com.opengd.integration.fattureweb.mapper;

import br.com.opengd.integration.fattureweb.dto.conteudo.DadosDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Mapper dedicado para converter o payload do FattureWeb entre o modelo tipado (DadosDTO)
 * e a arvore JSON (JsonNode). Isso facilita persistencia em jsonb sem perder a tipagem.
 */
public final class FattureWebJsonMapper {

    private FattureWebJsonMapper() {
    }

    public static JsonNode toJsonNode(DadosDTO dadosDTO, ObjectMapper objectMapper) {
        if (dadosDTO == null) {
            return null;
        }
        // valueToTree nao depende de serializacao para string, e evita perda de estrutura.
        return objectMapper.valueToTree(dadosDTO);
    }

    public static DadosDTO toDadosDTO(JsonNode node, ObjectMapper objectMapper) {
        if (node == null) {
            return null;
        }
        try {
            return objectMapper.treeToValue(node, DadosDTO.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("Falha ao converter JsonNode para DadosDTO", e);
        }
    }
}

