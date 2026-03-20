-- Reversão: remover colunas de observabilidade

ALTER TABLE fattureweb_processamento
    DROP COLUMN IF EXISTS status,
    DROP COLUMN IF EXISTS erro,
    DROP COLUMN IF EXISTS total_processado,
    DROP COLUMN IF EXISTS correlation_id;
