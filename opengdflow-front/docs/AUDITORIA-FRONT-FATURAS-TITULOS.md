# Auditoria Frontend – Faturas e Títulos (OpenGD)

**Data:** 2025-03  
**Contexto:** Backend auditado com precisão numérica 19 dígitos (4 decimais para tarifas/energia, 2 para BRL) e relações LAZY em Fatura/Título.

---

## 1. Resumo das alterações já aplicadas

| Arquivo | Ajuste |
|--------|--------|
| `lib/utils.ts` | `toNumeric()`, `localeCurrencyFormat(value?: number \| string)`, `localeEnergyFormat(value, decimals)` para exibição segura e 4 decimais em medições. |
| `app/(core)/_components/fatura-summary-view-sheet.tsx` | `formatKWh` usa `localeEnergyFormat` (4 dec); tarifas exibidas com 4 casas decimais (R$/kWh). |
| `app/(core)/dashboard/_components/infor-cards.tsx` | Total energia gerada/distribuída e saldo acumulado formatados com `localeEnergyFormat(..., 4)`. |
| `app/(core)/faturas/_components/form-components/dados-tarifarios-fields.tsx` | Inputs de tarifa com `step={0.0001}`, `min={0}`, `inputMode="decimal"` para permitir 4 decimais. |

---

## 2. Validação de tipagem (interfaces)

### 2.1 `lib/types/api.d.ts` (OpenAPI)

- **FaturaResponse / FaturaRequest:** Campos numéricos estão como `number`. O backend pode enviar números grandes ou, em alguns cenários, strings para preservar precisão.
- **Recomendação:** Manter `number` na API gerada. Na camada de exibição e formulários, usar `toNumeric()` e `localeCurrencyFormat`/`localeEnergyFormat`, que já aceitam `number | string`.

### 2.2 `lib/models/invoices.ts`

- **Invoice** estende `FaturaResponse` com `id: number`. Consistente.
- Nenhuma alteração obrigatória; uso de `localeCurrencyFormat`/`localeEnergyFormat` nos componentes cobre valores vindos como number ou string.

### 2.3 Campos que devem suportar 4 decimais (medições/tarifas)

- Energia: `energiaInjetada`, `consumo`, `consumoLocalUsina`, `energiaConpensadaLocal`, `saldoAcumuladoAtual`, `energiaDistribuida`, todas as tarifas (`tarifaTotalCI`, etc.).
- Valores em BRL (2 decimais): `valorTotalFatura`, `valorIcms`, `valorPis`, `valorConfins`, `valorEnergiaCompensada`, `custoSemGD`.

---

## 3. Máscaras e inputs

### 3.1 `app/(core)/faturas/_components/form-components/dados-tarifarios-fields.tsx`

- **Status:** Corrigido. Todos os inputs de tarifa (TESI, TUSDSI, Total SI, TECI, TUSDCI, Total CI, TE/TUSD/Total Compensável) com `step={0.0001}`, `min={0}`, `inputMode="decimal"`.
- **Opcional:** Se no futuro for necessário limitar a 4 casas decimais na digitação, usar máscara (ex.: `react-number-format` ou regex `onChange` com `^\d*(\.\d{0,4})?$`).

### 3.2 `app/(core)/faturas/_components/form-components/zod-schemas.ts`

- Tarifas e energias usam `z.coerce.number()`. Isso aceita string do input e converte para number; não limita casas decimais.
- **Sugestão (opcional):** Para validar máximo 4 decimais em tarifas, usar refinamento, por exemplo:
  `z.coerce.number().refine((n) => Number.isInteger(n * 1e4) / 1e4, { message: "Máximo 4 casas decimais" })` ou equivalente.

### 3.3 Cobranças – `app/(core)/cobrancas/_components/form-components/zod-schemas.ts`

- Campos como `tarifaEnergiaCompensada`, `tarifaConsumoLocal`, `tarifaEnergiaDistribuida`, `tarifaComImposto`, `tarifaSemImposto`, `tarifaDesconto` são `z.coerce.number()`. Consistente com faturas; inputs de cobrança que forem tarifas (R$/kWh) devem ter `step={0.0001}` nos componentes de formulário correspondentes (verificar em `dados-calculo.tsx` e formulários de cobrança).

---

## 4. Tratamento de strings/numbers e arredondamentos

### 4.1 Evitar `toFixed(2)` em tarifas/energia

- **Regra:** Tarifas e medições de energia: exibir com até 4 decimais (uso de `localeEnergyFormat(..., 4)` ou equivalente). Valores em BRL: 2 decimais (`localeCurrencyFormat`).
- **Verificado:** Nenhum `toFixed(2)` em código de faturas/títulos foi encontrado em locais de tarifa/energia. O único `toFixed(2)` encontrado é em `pessoas/contatos/_components/forms/file-uploader.tsx` (tamanho em KB), fora do escopo Fatura/Título.

### 4.2 Funções de formatação centralizadas (`lib/utils.ts`)

- **localeCurrencyFormat(value?: number | string | null):** Valores em BRL; aceita string; 2 decimais.
- **localeEnergyFormat(value?, decimals = 4):** Medições e tarifas em R$/kWh; aceita string; até 4 decimais.
- **toNumeric(value):** Converte number | string para number de forma segura para uso em cálculos e formatação.

---

## 5. Exibição (gráficos e dashboard)

### 5.1 `app/(core)/dashboard/_components/infor-cards.tsx`

- **Status:** Corrigido. `totalEnergiaGerada`, `totalEnergiaDistribuida` e `saldoAcumulado` usam `localeEnergyFormat(..., 4)`, evitando problemas com números muito grandes ou string vinda do backend.

### 5.2 `app/(core)/dashboard/_components/energy-chart.tsx`

- Dados vêm de `fetchEnergiaGeradaVsConsumida` (`energiaGerada`, `energiaConsumida` por `mesReferencia`). Recharts consome números diretamente; valores muito grandes podem ser exibidos em notação científica no eixo.
- **Sugestão:** Se o backend enviar valores muito grandes, formatar labels do eixo Y e do tooltip com `localeEnergyFormat(value, 4)` (via `tickFormatter` e `content` do `ChartTooltipContent`). Opcional até haver reclamação de legibilidade.

### 5.3 `app/(core)/dashboard/_components/faturas-section.tsx`

- Coluna "Valor total" usa `row?.valorTotalFatura?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })`. Funciona para number; se o backend passar string, pode quebrar.
- **Sugestão:** Trocar para `localeCurrencyFormat(row?.valorTotalFatura)` para aceitar number | string e manter 2 decimais.

### 5.4 Listas de faturas (list-view, faturas-list em usina/perfil/consumidor)

- Onde já usam `localeCurrencyFormat(row?.valorTotalFatura)` está correto após a atualização de `localeCurrencyFormat` para aceitar string.
- Verificar todos os arquivos que exibem `valorTotalFatura` ou `valorTotal` e padronizar para `localeCurrencyFormat(...)`.

---

## 6. Relações Lazy (acesso a objetos relacionados)

### 6.1 Acesso seguro já utilizado

- **`app/(core)/_components/fatura-summary-view-sheet.tsx`:** `fatura.usina?.nome`, `fatura.usina?.uc`, `fatura.consumidor?.nome`, `fatura.consumidor?.uc` — uso de optional chaining evita erro quando usina/consumidor vêm lazy e não estão carregados.

### 6.2 Tabelas (list-screen/table.tsx)

- **`accessRowData(row, key)`** faz `key.split(".").reduce((acc, k) => acc?.[k], row)`. Para chaves como `usina.nome` ou `consumidor.nome`, se `usina` ou `consumidor` for `undefined`/`null`, o resultado é `undefined` (não lança). Células exibem vazio. **OK.**

### 6.3 Colunas que usam path aninhado

- **faturas-section.tsx**, **list-view.tsx** (faturas), **faturas-list.tsx** (usinas, perfil, consumidor): colunas com `key: "usina.nome"`, `key: "usina.uc"`, `key: "consumidor.nome"`, `key: "consumidor.uc"` não possuem `render` customizado; o table usa `accessRowData`. Com lazy, `usina`/`consumidor` podem vir `undefined` e a célula fica vazia. **Comportamento aceitável.** Se for desejável exibir "—" ou "N/A", pode-se adicionar `render` que use `row?.usina?.nome ?? "—"` (e equivalente para consumidor).

### 6.4 Cobranças / Título

- Em formulários e views de cobrança (Título), sempre acessar `cobranca.usina?.nome`, `cobranca.consumidor?.nome`, `titulo.tipoDescontoItem?.nome` etc., pois usina/consumidor/tipoDescontoItem podem ser LAZY no backend.

---

## 7. Arquivos com inconsistências ou sugestões pontuais

| Arquivo | Inconsistência / Sugestão |
|---------|---------------------------|
| **dashboard/_components/faturas-section.tsx** | Coluna valor total: usar `localeCurrencyFormat(row?.valorTotalFatura)` em vez de `toLocaleString` direto para aceitar string do backend. |
| **cobrancas/_components/form-components/** (dados-calculo, receber/dados-calculo) | Se houver inputs de tarifa (R$/kWh), adicionar `step={0.0001}` e `inputMode="decimal"` para permitir 4 decimais. |
| **cobrancas/_components/fatura-view/fatura-pagar-react2print.tsx** e **fatura-receber-react2print.tsx** | Valores monetários e de energia já usam `localeCurrencyFormat`/`localeNumberFormat`; garantir que valores vindos do backend (number ou string) sejam tratados (ex.: passar por `toNumeric` antes de cálculos ou usar as funções que já aceitam string). |
| **lib/models/estatisticas-fatura.ts** | EstatisticasFatura espelha a API; campos como `consumoTotal`, `creditosAcumulados`, `saldoFaltante` podem ser number ou string se o backend mudar. Na exibição, usar `localeEnergyFormat` ou `localeCurrencyFormat` conforme o tipo. |
| **Energy chart (energy-chart.tsx)** | Opcional: formatar eixo Y e tooltip com `localeEnergyFormat` para valores muito grandes. |

---

## 8. Checklist pós-auditoria

- [x] Tipagem: interfaces alinhadas ao backend; formatação aceita number | string onde necessário.
- [x] Inputs de tarifa (faturas): step 0.0001 e inputMode decimal.
- [x] Exibição: `localeCurrencyFormat` (BRL, 2 dec), `localeEnergyFormat` (4 dec) para medições/tarifas.
- [x] Dashboard resumo geral: energia e saldo com `localeEnergyFormat(..., 4)`.
- [x] Fatura summary sheet: kWh e tarifas com 4 decimais; relações usina/consumidor com optional chaining.
- [ ] Faturas-section: trocar toLocaleString da coluna valor por `localeCurrencyFormat` (recomendado).
- [ ] Cobranças: revisar inputs de tarifa e uso de localeCurrencyFormat/localeEnergyFormat em dados-calculo e prints (recomendado).
- [ ] Tabelas: opcionalmente adicionar render para usina.nome/consumidor.nome com fallback "—" quando lazy não carregado.

---

## 9. Código sugerido para ajustes pendentes

### 9.1 `app/(core)/dashboard/_components/faturas-section.tsx` – coluna valor total

Substituir o `render` da coluna "Valor total":

```ts
// De:
render: (row) =>
  row?.valorTotalFatura
    ? row?.valorTotalFatura?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "",

// Para:
render: (row) => (row?.valorTotalFatura != null ? localeCurrencyFormat(row.valorTotalFatura) : ""),
```

E garantir import: `import { localeCurrencyFormat } from "@/lib/utils";`

### 9.2 Colunas usina.nome / consumidor.nome com fallback (opcional)

Em qualquer `tableColumns` que use `key: "usina.nome"` ou `key: "consumidor.nome"` sem `render`, pode-se adicionar:

```ts
{
  key: "usina.nome",
  label: "Nome da usina",
  cellProps: { className: "max-w-[150px]" },
  render: (row) => row?.usina?.nome ?? "—",
},
```

(Idem para `usina.uc`, `consumidor.nome`, `consumidor.uc`.)

---

*Fim do relatório de auditoria.*
