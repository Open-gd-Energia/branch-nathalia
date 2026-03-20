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

Configure para **Production**, **Preview** e **Development**. Sem isso o deploy pode falhar ou o app quebrar:

| Variável | Exemplo | Obrigatório |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://app.opengd.com.br:8080` (URL pública do backend) | Sim |
| `NEXTAUTH_URL` | `https://seu-projeto.vercel.app` (URL do deploy Vercel) | Sim |
| `NEXTAUTH_SECRET` | Gere com `openssl rand -base64 32` | Sim |

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
