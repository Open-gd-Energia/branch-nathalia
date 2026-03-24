-- Bloco 12: Adicionar campos do JSON FattureWeb na tabela FATURA
-- Campos ausentes identificados ao comparar JSON de faturas com a entidade Fatura
-- Todos nullable para compatibilidade com registros existentes

ALTER TABLE fatura
    ADD COLUMN IF NOT EXISTS data_emissao        DATE,
    ADD COLUMN IF NOT EXISTS nota_fiscal         VARCHAR(100),
    ADD COLUMN IF NOT EXISTS aviso_crte          BOOLEAN,
    ADD COLUMN IF NOT EXISTS possui_debitos      BOOLEAN,
    ADD COLUMN IF NOT EXISTS subgrupo            VARCHAR(20),
    ADD COLUMN IF NOT EXISTS cod_unidade_geradora VARCHAR(255);

COMMENT ON COLUMN fatura.data_emissao          IS 'Data de emissão da fatura (fatura.data_emissao do JSON FattureWeb)';
COMMENT ON COLUMN fatura.nota_fiscal           IS 'Número da nota fiscal (outros.nota_fiscal do JSON FattureWeb)';
COMMENT ON COLUMN fatura.aviso_crte            IS 'Indica se há aviso de corte (outros.aviso_corte do JSON FattureWeb)';
COMMENT ON COLUMN fatura.possui_debitos        IS 'Indica se a UC possui débitos (outros.possui_debitos do JSON FattureWeb)';
COMMENT ON COLUMN fatura.subgrupo              IS 'Subgrupo tarifário da UC, ex: B3 (unidade_consumidora.subgrupo do JSON FattureWeb)';
COMMENT ON COLUMN fatura.cod_unidade_geradora  IS 'Código(s) da(s) unidade(s) geradoras, separados por ; (devolucao_geracao.cod_unidade_geradora do JSON FattureWeb)';
