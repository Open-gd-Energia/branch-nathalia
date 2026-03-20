package br.com.opengd.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Bloco 1: Regressão da chave composta AlocacaoItem.
 * Garante ordem alocacaoId, consumidorId e equals/hashCode corretos.
 */
class AlocacaoItemIdTest {

    @Test
    void constructor_preservaOrdemAlocacaoConsumidor() {
        Long alocacaoId = 10L;
        Long consumidorId = 20L;

        AlocacaoItemId id = new AlocacaoItemId(alocacaoId, consumidorId);
        AlocacaoItemId esperado = new AlocacaoItemId(alocacaoId, consumidorId);

        assertEquals(esperado, id);
        assertEquals(esperado.hashCode(), id.hashCode());
    }

    @Test
    void equals_identicosRetornamTrue() {
        AlocacaoItemId a = new AlocacaoItemId(1L, 2L);
        AlocacaoItemId b = new AlocacaoItemId(1L, 2L);
        assertEquals(a, b);
    }

    @Test
    void equals_diferentesRetornamFalse() {
        AlocacaoItemId a = new AlocacaoItemId(1L, 2L);
        AlocacaoItemId b = new AlocacaoItemId(1L, 3L);
        AlocacaoItemId c = new AlocacaoItemId(2L, 2L);
        assertNotEquals(a, b);
        assertNotEquals(a, c);
    }

    @Test
    void hashCode_identicosTemMesmoHash() {
        AlocacaoItemId a = new AlocacaoItemId(1L, 2L);
        AlocacaoItemId b = new AlocacaoItemId(1L, 2L);
        assertEquals(a.hashCode(), b.hashCode());
    }

    @Test
    void equals_comNullRetornaFalse() {
        AlocacaoItemId id = new AlocacaoItemId(1L, 2L);
        assertNotEquals(null, id);
        assertFalse(id.equals(null));
    }
}
