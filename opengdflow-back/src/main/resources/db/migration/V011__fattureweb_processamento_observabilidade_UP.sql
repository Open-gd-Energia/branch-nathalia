-- Bloco 11: Melhorar rastreabilidade operacional de FATTUREWEB_PROCESSAMENTO
-- Campos: status, erro, total_processado, correlation_id
-- Compatível com registros existentes (colunas nullable)

ALTER TABLE fattureweb_processamento
    ADD COLUMN IF NOT EXISTS status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS erro TEXT,
    ADD COLUMN IF NOT EXISTS total_processado INTEGER,
    ADD COLUMN IF NOT EXISTS correlation_id VARCHAR(64);

COMMENT ON COLUMN fattureweb_processamento.status IS 'SUCESSO, ERRO, EM_ANDAMENTO';
COMMENT ON COLUMN fattureweb_processamento.erro IS 'Mensagem de erro quando status=ERRO';
COMMENT ON COLUMN fattureweb_processamento.total_processado IS 'Quantidade de faturas processadas com sucesso';
COMMENT ON COLUMN fattureweb_processamento.correlation_id IS 'ID para correlacionar logs e rastreamento';
