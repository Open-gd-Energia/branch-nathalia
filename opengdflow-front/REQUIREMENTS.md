# Requisitos e instalação (antes de subir o projeto)

Tudo que precisa estar instalado e configurado **antes** de rodar o projeto.

---

## Instalar tudo de uma vez (Windows)

Com **Node.js** já instalado, na pasta do projeto rode no PowerShell:

```powershell
.\setup.ps1
```

O script verifica Node, instala o pnpm se faltar, cria `.env` a partir de `.env.example` (se não existir) e roda `pnpm install`. Depois é só editar o `.env` e rodar `pnpm dev`.

**Só o comando de dependências (sem script):** na pasta do projeto execute `pnpm install` — isso instala todas as dependências do `package.json`.

---

## 1. Pré-requisitos de sistema

| Requisito      | Versão recomendada | Observação |
|----------------|--------------------|------------|
| **Node.js**    | 18.18+ ou 20.x     | Next.js 15 precisa de Node 18.18 no mínimo. Use [nvm](https://github.com/nvm-sh/nvm) ou [fnm](https://github.com/Schniz/fnm) para gerenciar versões. |
| **pnpm**       | 10.x               | O projeto usa pnpm como gerenciador de pacotes. |

### Instalar Node.js

- **Windows:** [nodejs.org](https://nodejs.org/) ou `winget install OpenJS.NodeJS.LTS`
- **Com nvm:** `nvm install 20` e `nvm use 20`
- Se existir `.nvmrc` na raiz: `nvm use`

### Instalar pnpm

```bash
npm install -g pnpm
# ou
corepack enable && corepack prepare pnpm@10.7.1 --activate
```

---

## 2. Dependências do projeto (npm/pnpm)

As dependências estão em `package.json`. **Não é necessário instalar nada manualmente** além do que está listado lá; o comando abaixo instala tudo:

```bash
pnpm install
```

Isso instala automaticamente:

- **Produção:** next, react, next-auth, react-query, radix-ui, tailwind, etc.
- **Desenvolvimento:** typescript, eslint, biome, etc.

---

## 3. Variáveis de ambiente

Crie um arquivo `.env` na **raiz do projeto** (ao lado de `package.json`) com as variáveis necessárias.

### Variáveis obrigatórias

| Variável               | Descrição |
|------------------------|-----------|
| `NEXT_PUBLIC_API_URL`  | URL base da API. **Desenvolvimento local:** `http://localhost:8080` (backend Spring Boot em `server.port=8080`). Produção: ex. `https://app.opengd.com.br:8080`. |
| `NEXTAUTH_URL`         | URL do frontend (onde o Next.js roda). Em dev: `http://localhost:3000`. |
| `NEXTAUTH_SECRET`      | Chave secreta para sessões JWT do NextAuth (gere com `openssl rand -base64 32`). |

### Exemplo de `.env` (desenvolvimento local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta_aqui
```

### Backend (CORS)

Para o front em outra porta/host (ex.: `http://127.0.0.1:3000`), configure no **backend** em `application.properties`:

```properties
opengd.url.frontend=http://localhost:3000
```

ou `http://127.0.0.1:3000` conforme onde o Next.js estiver rodando. Reinicie o backend após alterar (`.\mvnw.cmd spring-boot:run`).

Use o arquivo `.env.example` como modelo (copie para `.env` e preencha os valores).

---

## 4. Ordem recomendada (resumo)

1. Instalar **Node.js** (18.18+ ou 20.x).
2. Instalar **pnpm** (`npm install -g pnpm`).
3. Clonar o repositório e entrar na pasta do projeto.
4. Copiar `.env.example` para `.env` e preencher as variáveis.
5. Rodar **`pnpm install`**.
6. Rodar **`pnpm dev`** para subir o servidor de desenvolvimento.

```bash
# Exemplo completo
git clone <url-do-repo>
cd opengdflow-front
cp .env.example .env
# Editar .env com os valores corretos
pnpm install
pnpm dev
```

---

## 5. Comandos úteis após a instalação

| Comando           | Descrição |
|-------------------|-----------|
| `pnpm dev`        | Sobe o servidor de desenvolvimento (com Turbopack). |
| `pnpm build`      | Gera o build de produção. |
| `pnpm start`      | Sobe o servidor em modo produção (após `pnpm build`). |
| `pnpm check`      | Verifica código com Biome. |
| `pnpm fix`        | Aplica correções automáticas do Biome. |
| `pnpm generate-types` | Gera tipos TypeScript a partir da API OpenAPI (requer API acessível). |
