package br.com.opengd.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Bloco 3: Regressão do mapeamento de status ATIVO/INATIVO.
 */
class StatusAtivoInativoMapperTest {

    @Test
    void parseStatusAtivoInativoToLong_ativoRetorna1() {
        assertEquals(1L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("ATIVO"));
        assertEquals(1L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("ativo"));
    }

    @Test
    void parseStatusAtivoInativoToLong_inativoRetorna0() {
        assertEquals(0L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("INATIVO"));
        assertEquals(0L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("inativo"));
    }

    @Test
    void parseStatusAtivoInativoToLong_numericoLegado() {
        assertEquals(1L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("1"));
        assertEquals(0L, StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("0"));
    }

    @Test
    void parseStatusAtivoInativoToLong_nullOuVazioRetornaNull() {
        assertNull(StatusAtivoInativoMapper.parseStatusAtivoInativoToLong(null));
        assertNull(StatusAtivoInativoMapper.parseStatusAtivoInativoToLong(""));
        assertNull(StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("   "));
    }

    @Test
    void parseStatusAtivoInativoToLong_invalidoLancaExcecao() {
        assertThrows(IllegalArgumentException.class,
                () -> StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("INVALIDO"));
        assertThrows(IllegalArgumentException.class,
                () -> StatusAtivoInativoMapper.parseStatusAtivoInativoToLong("xyz"));
    }
}
