# Bloco 1 — Diagnóstico do Backend (Camada Canônica e Contrato JSON)

## 1. Entidades problemáticas

### Fatura
| Campo atual | Problema | Ação recomendada |
|-------------|----------|------------------|
| `confins` | Grafia incorreta (deveria ser COFINS) | Renomear para `cofins`, manter `@Column(name="confins")` até migração |
| `valorConfins` | Idem | Renomear para `valorCofins`, `@Column(name="valor_confins")` |
| `unidadeConsumidora` | Contrato usa `numero_uc` quando for número da UC | Avaliar alias ou campo `numeroUc` |
| `vencimento` | Contrato usa `data_vencimento` | Adicionar `@JsonProperty("data_vencimento")` ou alias |
| `valorTotalFatura` | Contrato usa `total_fatura` | Adicionar `@JsonProperty("total_fatura")` ou alias |
| Estrutura plana | Produtos, tributos, medidores, leituras estão achatados | **Pendente**: criar entidades FaturaProduto, FaturaTributo, FaturaMedidor, FaturaMedidorLeitura, FaturaBandeiraPeriodo, FaturaAnaliseTributaria quando schema existir |

### Consumidor
| Campo atual | Status | Observação |
|-------------|--------|------------|
| `consumoReferenciaKwh` | OK | Já tem `@Column(name="consumo_referencia_kwh")` (bloco 2) |
| `uc` | OK | Pode ser `numero_uc` no contrato; validar semântica |

### Usina
| Campo atual | Status | Observação |
|-------------|--------|------------|
| `potenciaPico` | OK | Já tem `@Column(name="potencia_pico")` (bloco 2) |

### FaturaHistoricoFaturamento
| Campo atual | Problema | Ação |
|-------------|----------|------|
| `dias` | Contrato pode usar `periodo_dias` | Verificar contrato |
| `data` | OK | - |

### Tabelas/entidades ausentes
- `fatura_produto` — não existe no código
- `fatura_tributo` — não existe no código
- `fatura_medidor` — não existe no código
- `fatura_medidor_leitura` — não existe no código
- `fatura_bandeira_periodo` — não existe no código
- `fatura_analise_tributaria` — não existe no código

---

## 2. DTOs problemáticos

### FaturaRequest / FaturaResponse
| Campo | Problema | Ação |
|-------|----------|------|
| `confins` / `valorConfins` | Grafia incorreta | Renomear para `cofins` / `valorCofins`, adicionar `@JsonAlias` para compatibilidade |
| `energiaCompensadaLocal` | OK | Já tem `@JsonAlias("energiaConpensadaLocal")` |
| Contrato snake_case | API atual usa camelCase | Adicionar `@JsonProperty` para contrato oficial quando necessário |

### ConsumidorRequest / ConsumidorResponse
| Campo | Status |
|-------|--------|
| `consumoReferenciaKwh` | OK com `@JsonAlias("consumorReferenciaKwh")` |

---

## 3. Queries problemáticas

### FaturaRepository
- JPQL usa `d.vencimento`, `d.mesReferencia`, `d.status` — nomes de atributos Java, não colunas. **OK**.
- Nenhuma referência a `confins`, `valor_confins` ou nomes legados incorretos.

### DashboardUseCaseImpl
- Native SQL usa `t.data_vencimento`, `t.valor_total` — colunas da tabela `titulo`. **OK**.

### Views canônicas
- `vw_fatura_canonica`, `vw_consumidor_canonica`, etc. — **não referenciadas** no código.
- Migração para views: **pendente** (depende de criação das views no banco).

---

## 4. Services problemáticos

### FattureWebUseCaseImpl
| Linha | Problema | Ação |
|-------|----------|------|
| 108-109 | `setConfins`, `setValorConfins` | Alterar para `setCofins`, `setValorCofins` após renomear no Request |

### FaturaUseCaseImpl
- Usa FaturaMapper; mapeamento automático via MapStruct. Ajustes no entity/request propagam.

---

## 5. Controllers impactados

### FaturaController
- Expõe FaturaRequest/FaturaResponse.
- Impacto: **baixo** — mudanças em DTOs com `@JsonAlias` mantêm compatibilidade.

---

## 6. Mappers

### FaturaMapper (MapStruct)
- Mapeia por nome de atributo. Renomear `confins` → `cofins` e `valorConfins` → `valorCofins` em Entity, Request e Response faz o mapper acompanhar automaticamente.

---

## 7. Resumo de prioridade

| Prioridade | Item | Risco | Esforço |
|------------|------|-------|---------|
| 1 | confins → cofins, valorConfins → valorCofins (Entity, Request, Response, FattureWebUseCaseImpl) | Baixo | Baixo |
| 2 | @JsonProperty para contrato snake_case (data_vencimento, total_fatura, numero_uc) | Médio (quebra frontend se não houver fallback) | Baixo |
| 3 | Criar entidades FaturaProduto, FaturaTributo, etc. | Alto (depende de schema) | Alto |
| 4 | Migrar leituras para views canônicas | Médio | Médio |

---

## 8. Validação necessária (humana)

1. **Schema do banco**: As colunas `cofins` e `valor_cofins` já existem ou ainda há apenas `confins` e `valor_confins`?
2. **Contrato JSON oficial**: O contrato exige snake_case (`data_vencimento`, `total_fatura`) ou camelCase?
3. **Tabelas novas**: As tabelas `fatura_produto`, `fatura_tributo`, etc. já existem no banco? Qual o DDL?
4. **Views canônicas**: As views `vw_fatura_canonica` etc. já foram criadas?

---

# Bloco 2 — Plano de refatoração

## O que será alterado

### Fase 1 — Correção semântica COFINS (implementação imediata)

| Arquivo | Alteração | Motivo |
|---------|-----------|--------|
| `Fatura.java` | `confins` → `cofins`, `valorConfins` → `valorCofins`; `@Column(name="confins")` e `@Column(name="valor_confins")` para compatibilidade com banco atual | Grafia correta do tributo COFINS |
| `FaturaRequest.java` | Idem + `@JsonAlias("confins")`, `@JsonAlias("valorConfins")` | Compatibilidade com clientes que enviam nomes antigos |
| `FaturaResponse.java` | Idem + `@JsonAlias` | Compatibilidade com frontend existente |
| `FattureWebUseCaseImpl.java` | `setConfins` → `setCofins`, `setValorConfins` → `setValorCofins` | Alinhamento com DTO |

### Fase 2 — Contrato JSON (quando definido)

- Adicionar `@JsonProperty("data_vencimento")` em `vencimento` se contrato exigir snake_case.
- Adicionar `@JsonProperty("total_fatura")` em `valorTotalFatura`/`totalFatura`.
- Adicionar `@JsonProperty("numero_uc")` em `unidadeConsumidora` quando for número da UC.

**Risco**: Quebra de frontend se não houver `@JsonAlias` para camelCase. **Recomendação**: manter camelCase como padrão e usar `@JsonProperty` apenas se o contrato oficial exigir snake_case.

### Fase 3 — Estruturas especializadas (backlog)

- Criar entidades `FaturaProduto`, `FaturaTributo`, `FaturaMedidor`, etc. quando o schema estiver disponível.
- Migrar leituras para views canônicas quando existirem.

## Riscos

| Alteração | Risco | Mitigação |
|-----------|-------|-----------|
| confins → cofins | Baixo | `@JsonAlias("confins")` mantém desserialização; `@JsonAlias("valorConfins")` idem |
| Renomear atributos Java | Baixo | MapStruct mapeia por nome; ajustar em todos os pontos |
| @Column(name="confins") | Nenhum | Mantém coluna atual; quando houver migração para `cofins`, alterar para `@Column(name="cofins")` |

## Ordem de alteração

1. Entity `Fatura`
2. `FaturaRequest`
3. `FaturaResponse`
4. `FattureWebUseCaseImpl`
5. Rodar `mvn test`

---

# Bloco 3 — Implementação (concluída)

## Alterações realizadas

| Arquivo | Alteração |
|---------|-----------|
| `Fatura.java` | `confins` → `cofins`, `valorConfins` → `valorCofins`; `@Column(name="confins")`, `@Column(name="valor_confins")` mantidos para compatibilidade com banco atual |
| `FaturaRequest.java` | `confins` → `cofins`, `valorConfins` → `valorCofins`; `@JsonAlias("confins")`, `@JsonAlias("valorConfins")` para compatibilidade |
| `FaturaResponse.java` | Idem ao Request |
| `FattureWebUseCaseImpl.java` | `setConfins` → `setCofins`, `setValorConfins` → `setValorCofins` |

## Resultado

- `mvn compile` — sucesso
- `mvn test` — sucesso
- MapStruct (FaturaMapper) — mapeamento automático por nome de atributo; sem alterações necessárias

---

# Bloco 4 — Validação e documentação final

## O que foi ajustado

| Item | Status |
|------|--------|
| Grafia COFINS (confins → cofins, valorConfins → valorCofins) | ✅ Implementado em Entity, Request, Response e FattureWebUseCaseImpl |
| Compatibilidade com banco legado | ✅ `@Column(name="confins")` e `@Column(name="valor_confins")` mantidos |
| Compatibilidade com clientes legados | ✅ `@JsonAlias("confins")` e `@JsonAlias("valorConfins")` nos DTOs |
| Compilação e testes | ✅ `mvn compile` e `mvn test` passando |

## O que ainda depende de validação manual

1. **Schema do banco**
   - Confirmar se as colunas físicas são `confins`/`valor_confins` (atual) ou se já existem `cofins`/`valor_cofins`.
   - Se o banco tiver sido migrado para colunas canônicas, alterar `@Column(name="cofins")` e `@Column(name="valor_cofins")` em `Fatura.java`.

2. **Contrato JSON oficial**
   - Definir se a API deve expor snake_case (`data_vencimento`, `total_fatura`, `numero_uc`) ou camelCase.
   - Se snake_case for exigido, adicionar `@JsonProperty` nos campos relevantes mantendo `@JsonAlias` para compatibilidade.

3. **Endpoints de Fatura**
   - Testar manualmente os endpoints que consomem/produzem FaturaRequest/FaturaResponse.
   - Verificar se integrações externas (frontend, parceiros) continuam funcionando.

## O que ainda ficou pendente

| Item | Motivo |
|------|--------|
| `@JsonProperty` para contrato snake_case | Aguardar definição do contrato JSON oficial |
| Entidades FaturaProduto, FaturaTributo, FaturaMedidor, FaturaMedidorLeitura, FaturaBandeiraPeriodo, FaturaAnaliseTributaria | Depende de schema/migrations no banco |
| Migração para views canônicas (vw_fatura_canonica, etc.) | Depende de criação das views no banco |
| Campos `vencimento` → `data_vencimento`, `valorTotalFatura` → `total_fatura` no contrato | Aguardar contrato oficial |
| Campo `unidadeConsumidora` vs `numero_uc` | Validar semântica (número da UC vs nome da unidade) |

## Arquivos alterados (resumo)

- `opengdflow-back/src/main/java/br/com/opengd/entity/Fatura.java`
- `opengdflow-back/src/main/java/br/com/opengd/controller/request/FaturaRequest.java`
- `opengdflow-back/src/main/java/br/com/opengd/controller/response/FaturaResponse.java`
- `opengdflow-back/src/main/java/br/com/opengd/usecase/impl/FattureWebUseCaseImpl.java`
