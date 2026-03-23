# Deploy no Vercel — Checklist

## 1. Configuração do Projeto (Vercel Dashboard)

Em **Settings → General**:

| Configuração | Valor |
|--------------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `opengdflow-front` |
| **Build Command** | (deixar em branco — usa vercel.json) |
| **Output Directory** | (deixar em branco) |
| **Install Command** | (deixar em branco — usa vercel.json) |

## 2. Variáveis de Ambiente (Settings → Environment Variables) — OBRIGATÓRIO

**Se aparecer "Server error" ou "error=Configuration" na tela de login, as variáveis não estão configuradas.**

Configure para **Production**, **Preview** e **Development**:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | URL do backend na VPS: `http://77.37.41.159:8080` (ou domínio se tiver SSL) | Sim |
| `NEXTAUTH_URL` | URL do deploy (ex: `https://branch-nathalia.vercel.app`) | Sim |
| `NEXTAUTH_SECRET` | Chave secreta — gere com `openssl rand -base64 32` no terminal | Sim |

### Como configurar no Vercel

1. Vercel Dashboard → seu projeto → **Settings** → **Environment Variables**
2. Adicione cada variável (Production, Preview e Development)
3. Para `NEXTAUTH_SECRET`: no terminal, rode `openssl rand -base64 32` e cole o resultado
4. **Redeploy** após salvar (Deployments → ⋯ → Redeploy)

**Importante:** O backend precisa estar acessível pela internet (não pode ser IP Tailscale ou rede privada).

## 3. Backend na VPS

O backend roda na VPS (`root@srv807837`). Para aceitar requisições do front:

1. **Crie o `.env`** na pasta `opengdflow-back` (não vai no Git):
   - `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
   - `OPENGD_URL_FRONTEND=https://branch-nathalia.vercel.app` (URL exata do front no Vercel)
2. **Suba o backend:** `./start.sh`
3. **Libere a porta 8080:** `ufw allow 8080 && ufw reload`

## 4. Redeploy

Depois de alterar Root Directory ou variáveis:

1. **Deployments** → último deploy → **⋯** → **Redeploy**
2. Ou faça um novo push no repositório

## 5. Login não funciona — Diagnóstico

1. **Teste de conectividade:** Acesse `https://branch-nathalia.vercel.app/api/health-backend`
   - Se `backendReachable: true` → backend está acessível; o problema pode ser credenciais ou usuário inexistente.
   - Se `backendReachable: false` → verifique: variáveis no Vercel, backend rodando na VPS, firewall (porta 8080).

2. **Variáveis no Vercel** (obrigatórias):
   - `NEXT_PUBLIC_API_URL` = `http://77.37.41.159:8080` (sem barra no final)
   - `NEXTAUTH_URL` = `https://branch-nathalia.vercel.app` (URL exata do seu front)
   - `NEXTAUTH_SECRET` = alguma chave (ex.: `openssl rand -base64 32`)

3. **Backend na VPS:** O processo está rodando? `./start.sh` ou `java -jar ...`

4. **Firewall:** `ufw allow 8080 && ufw reload`

5. **Usuário no banco:** O login usa e-mail + senha. O usuário precisa existir no banco (criado por admin ou seed).

## 6. Se ainda der 404

1. **Build Logs** — confira se o build terminou sem erro
2. **Runtime Logs** — veja se há erro ao acessar a página
3. Confirme que **Root Directory** está exatamente `opengdflow-front` (sem barra no final)
