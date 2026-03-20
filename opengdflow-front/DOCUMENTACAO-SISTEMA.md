# Documentação do sistema – Visão geral para quem está chegando

Este documento explica **cada parte relevante do projeto**: onde ficam os dados, se há mocks, como conseguir acesso e quais validações existem.

---

## 1. O que este projeto é

- **Frontend** em **Next.js 15** (React) que consome uma **API REST**.
- **Não há banco de dados neste repositório.** Todos os dados (usuários, usinas, consumidores, faturas, etc.) vêm da **API de backend**, configurada pela URL no `.env`.

---

## 2. Onde ficam as informações de “banco” (dados)

| O quê | Onde fica |
|-------|-----------|
| **Dados reais** | Na **API de backend**. A URL é definida no `.env` pela variável **`NEXT_PUBLIC_API_URL`** (ex.: `https://app.opengd.com.br:8080`). |
| **Tipos da API** | No front, em **`lib/types/api.d.ts`**. Esses tipos são gerados a partir do OpenAPI/Swagger do backend com o comando `pnpm generate-types` (veja `package.json`). |
| **Chamadas à API** | Centralizadas em **`lib/fetcher.ts`**: todas as requisições usam `NEXT_PUBLIC_API_URL` como base. Outros serviços (login, forgot-password, etc.) usam esse fetcher ou fazem `fetch` direto para a mesma base. |

Resumo: **não existe banco nem conexão com banco neste projeto.** Tudo passa pela API; o backend é que acessa o banco.

---

## 3. Dados mock

- **Não há dados mock** no código da aplicação para fluxos de negócio.
- O que aparece em buscas por “mock”/“fake”/“stub” são trechos de dependências (Next.js, React, lodash) ou build (pasta `.next`), não lógica de negócio.
- Para ter dados para testar, é necessário **backend rodando** (e eventualmente dados cadastrados lá) ou **mock do backend** fora deste repo (ex.: outro serviço ou ferramenta que simule a API).

---

## 4. Como fazer um “cadastro” para acessar o sistema

- **Não existe tela pública de “Cadastre-se”** neste frontend.
- O acesso é feito **somente por login** em **`/auth/signin`** (e-mail + senha).

Quem cria o usuário:

1. **Backend** – algum processo/endpoint no backend que cria usuários (ex.: cadastro administrativo, integração, seed).
2. **Área administrativa do próprio sistema** – usuários com permissão **ADMIN** ou **PESSOAS** podem criar outros usuários em **Pessoas → Usuários → Novo** (`app/(core)/pessoas/usuarios/novo/page.tsx`). Quem ainda não tem conta precisa ser criado por alguém que já tenha acesso (admin) ou pelo backend.

Fluxos de auth disponíveis no front:

- **Login:** `/auth/signin` → envia e-mail e senha para a API (`POST /auth/login`), depois o NextAuth mantém a sessão (JWT).
- **Recuperar senha:** `/auth/recover-password` → chama a API (`POST /auth/forgot-password`).
- **Redefinir senha (com token):** `/auth/change-password/[token]` → para o link enviado por e-mail após “esqueci minha senha”.

Resumo: **para “ter um cadastro” e acessar**, alguém (backend ou admin) precisa ter criado seu usuário; aí você usa **e-mail + senha** em `/auth/signin`.

---

## 5. Validações e controle de acesso

### 5.1 Login (credenciais)

- Formulário de login em **`app/auth/_components/login-form.tsx`**.
- Validação do formulário: **Yup** (e-mail obrigatório e válido, senha mínima 3 caracteres).
- Validação “de verdade”: na **API** – o front chama `POST /auth/login`; se a API retornar 401, o usuário vê “E-mail ou senha inválidos”.
- Após login bem-sucedido, o NextAuth chama a API para buscar o usuário (`GET /usuarios/:id`) e monta a sessão (incluindo **perfil** e **scopes**).

### 5.2 Sessão e token

- **NextAuth** com estratégia **JWT** (sessão em token, não em banco).
- Configuração em **`lib/auth/auth-options.ts`** (provedor Credentials, callbacks JWT/session, `NEXTAUTH_SECRET` no `.env`).
- Rota de API do NextAuth: **`app/api/auth/[...nextauth]/route.ts`** (GET/POST para login, session, etc.).

### 5.3 Proteção de rotas (quem acessa o quê)

- **`middleware.ts`** (na raiz) aplica **`withAuth`** do NextAuth e regras por **scope**.
- Mapa de rotas protegidas por scope em **`lib/routes-mapping.ts`**:
  - **ADMIN** – acessa tudo (incluindo `/dashboard`, `/pessoas`, `/config`, etc.).
  - **DADOS** – redirecionado para `/perfil/{tipo}` (ex.: perfil consumidor ou usina).
  - **GERACAO** – rotas `/usinas*`
  - **CONSUMO** – `/consumidores*`
  - **PESSOAS** – `/pessoas*`
  - **ALOCACAO** – `/alocacao*`
  - **COBRANCA** – `/cobrancas*`
  - **FATURAS** – `/faturas*`
  - **CONFIGURACAO** – `/config*`

Comportamento resumido:

- Sem estar logado e acessando rota protegida → redireciona para **`/auth/signin`** (com `callbackUrl`).
- Logado em **`/auth/*`** → redireciona para **`/`** (e a home redireciona conforme o scope).
- Logado mas **sem scope** necessário para aquela rota → redireciona para **`/forbidden`** (página 403).

A decisão de “qual primeira rota após o login” é feita em **`lib/utils.ts`** (`getPathBasedOnScope`) e usada na home **`app/page.tsx`** e no formulário de login (após sucesso).

---

## 6. Estrutura principal de pastas e arquivos

| Caminho | Função |
|---------|--------|
| **`app/page.tsx`** | Home: se logado, redireciona por scope; se não, redireciona para `/auth/signin`. |
| **`app/auth/`** | Login (`signin`), recuperar senha (`recover-password`), alterar senha com token (`change-password/[token]`). |
| **`app/(core)/`** | Toda a área logada: dashboard, perfil (consumidor/usina), pessoas, usinas, consumidores, faturas, cobranças, alocação, config. |
| **`app/forbidden/page.tsx`** | Página 403 quando o usuário não tem permissão (scope) para a rota. |
| **`app/api/auth/[...nextauth]/route.ts`** | Rota de API do NextAuth (login, session, etc.). |
| **`lib/auth/auth-options.ts`** | Configuração do NextAuth (Credentials, JWT, callbacks, uso de `NEXT_PUBLIC_API_URL` e `NEXTAUTH_SECRET`). |
| **`lib/fetcher.ts`** | Cliente HTTP para a API (base URL do `.env`, envia token da sessão quando existir). |
| **`lib/get-access-token.ts`** | Obtém o token JWT da sessão para usar nas chamadas à API. |
| **`lib/routes-mapping.ts`** | Mapa de scopes → rotas protegidas (usado pelo middleware). |
| **`lib/utils.ts`** | Utilitários, incluindo `getPathBasedOnScope`. |
| **`lib/types/api.d.ts`** | Tipos TypeScript gerados a partir do OpenAPI do backend. |
| **`middleware.ts`** | Proteção global: exige login e scope adequado para cada rota. |
| **`.env` / `.env.example`** | `NEXT_PUBLIC_API_URL` (API) e `NEXTAUTH_SECRET` (sessão). |

---

## 7. Resumo rápido

| Dúvida | Resposta |
|--------|----------|
| Onde ficam os dados de “banco”? | No **backend**. O front só consome a API; a URL é **`NEXT_PUBLIC_API_URL`** no `.env`. |
| Tem dados mock? | **Não.** Tudo vem da API. |
| Como me cadastrar para acessar? | Não há “cadastre-se” aqui. Usuário é criado no **backend** ou por **admin** em Pessoas → Usuários → Novo. Depois use **e-mail + senha** em `/auth/signin`. |
| Que validações existem? | Formulário de login (Yup); autenticação e dados do usuário na **API**; **middleware** e **scopes** para permitir ou bloquear rotas (sem permissão → `/forbidden`). |

Se você pegou o projeto e não conhece: configure o `.env` com a URL do backend e o `NEXTAUTH_SECRET`, rode `pnpm install` e `pnpm dev`. Para ter um usuário para logar, use um já criado no backend ou peça a um admin para criar em Pessoas → Usuários (ou equivalente no backend).
