# Variáveis de ambiente do backend

Para deploy (Render, Railway, VPS, etc.) ou uso local via `.env`:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://77.37.41.159:5433/opengd_bd` | Não (tem default) |
| `SPRING_DATASOURCE_USERNAME` | usuário do PostgreSQL | Não (default: postgres) |
| `SPRING_DATASOURCE_PASSWORD` | senha do PostgreSQL | Sim (em produção) |

**Nota:** O backend é Spring Boot (Java). Ele não roda no Vercel — use Render, Railway, Fly.io ou sua VPS. O Vercel hospeda apenas o frontend Next.js.
