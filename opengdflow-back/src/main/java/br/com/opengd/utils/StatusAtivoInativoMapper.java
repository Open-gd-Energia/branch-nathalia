package br.com.opengd.utils;

public final class StatusAtivoInativoMapper {
    private StatusAtivoInativoMapper() {
    }

    /**
     * Mapeia status semântico para valor numérico legado.
     * Padrão atual (documentado no swagger do Usuario): 0=INATIVO, 1=ATIVO.
     */
    public static Long parseStatusAtivoInativoToLong(String status) {
        if (status == null) return null;

        String v = status.trim();
        if (v.isEmpty()) return null;

        // Aceita também 0/1 já existentes
        if (v.matches("-?\\d+")) {
            return Long.parseLong(v);
        }

        String upper = v.toUpperCase();
        return switch (upper) {
            case "ATIVO" -> 1L;
            case "INATIVO" -> 0L;
            default -> throw new IllegalArgumentException("status inválido (espere 0/1 ou ATIVO/INATIVO): " + status);
        };
    }
}

