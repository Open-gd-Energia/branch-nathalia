-- Rollback Bloco 12: Remover campos adicionados do JSON FattureWeb

ALTER TABLE fatura
    DROP COLUMN IF EXISTS data_emissao,
    DROP COLUMN IF EXISTS nota_fiscal,
    DROP COLUMN IF EXISTS aviso_crte,
    DROP COLUMN IF EXISTS possui_debitos,
    DROP COLUMN IF EXISTS subgrupo,
    DROP COLUMN IF EXISTS cod_unidade_geradora;
