# Deploy no Vercel — Checklist

## 1. Configuração do Projeto (Vercel Dashboard)

Em **Settings → General**:

| Configuração | Valor |
|--------------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `opengdflow-front` |
| **Build Command** | `pnpm build` (ou deixar em branco para auto) |
| **Output Directory** | (deixar em branco — Next.js usa `.next`) |
| **Install Command** | `corepack enable && pnpm install` |

## 2. Variáveis de Ambiente (Settings → Environment Variables)

Configure para **Production**, **Preview** e **Development**:

| Variável | Exemplo | Obrigatório |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://seu-backend.onrender.com` ou `https://app.opengd.com.br:8080` | Sim |
| `NEXTAUTH_URL` | `https://branch-nathalia-xxx.vercel.app` (URL do deploy) | Sim |
| `NEXTAUTH_SECRET` | Gere com `openssl rand -base64 32` | Sim |

**Importante:** O backend (Spring Boot) precisa estar acessível pela internet. Supabase é o banco; o backend deve estar em Render, Railway, Fly.io ou similar.

## 3. Backend e CORS

No `application.properties` do backend, configure:

```properties
opengd.url.frontend=https://branch-nathalia-xxx.vercel.app
```

Ou use `*` temporariamente para testes (não recomendado em produção).

## 4. Redeploy

Depois de alterar Root Directory ou variáveis:

1. **Deployments** → último deploy → **⋯** → **Redeploy**
2. Ou faça um novo push no repositório

## 5. Se ainda der 404

1. **Build Logs** — confira se o build terminou sem erro
2. **Runtime Logs** — veja se há erro ao acessar a página
3. Confirme que **Root Directory** está exatamente `opengdflow-front` (sem barra no final)
