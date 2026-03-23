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
| `NEXT_PUBLIC_API_URL` | URL pública do backend (ex: `https://app.opengd.com.br:8080`) | Sim |
| `NEXTAUTH_URL` | URL do deploy (ex: `https://branch-nathalia.vercel.app`) | Sim |
| `NEXTAUTH_SECRET` | Chave secreta — gere com `openssl rand -base64 32` no terminal | Sim |

### Como configurar no Vercel

1. Vercel Dashboard → seu projeto → **Settings** → **Environment Variables**
2. Adicione cada variável (Production, Preview e Development)
3. Para `NEXTAUTH_SECRET`: no terminal, rode `openssl rand -base64 32` e cole o resultado
4. **Redeploy** após salvar (Deployments → ⋯ → Redeploy)

**Importante:** O backend precisa estar acessível pela internet (não pode ser IP Tailscale ou rede privada).

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
