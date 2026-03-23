# Variáveis de ambiente do backend

Para deploy (Render, Railway, VPS, etc.) ou uso local via `.env`:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://77.37.41.159:5433/opengd_bd` | Não (tem default) |
| `SPRING_DATASOURCE_USERNAME` | usuário do PostgreSQL | Não (default: postgres) |
| `SPRING_DATASOURCE_PASSWORD` | senha do PostgreSQL | Sim (em produção) |

**Nota:** O backend é Spring Boot (Java). Ele não roda no Vercel — use Render, Railway, Fly.io ou sua VPS. O Vercel hospeda apenas o frontend Next.js.

## Deploy na VPS (JAR direto)

O arquivo `.env` **não** entra no Git. No servidor:

1. Copie o exemplo e preencha os valores reais:  
   `cp .env.example .env` e edite `.env`.
2. Use o script para subir com as variáveis carregadas:  
   `chmod +x start.sh && ./start.sh`

Se preferir rodar o JAR manualmente, exporte as variáveis antes:

```bash
export SPRING_DATASOURCE_USERNAME=admin
export SPRING_DATASOURCE_PASSWORD="sua_senha"
java -jar target/opengd-0.0.1-SNAPSHOT.jar
```

**Senhas com `!` ou outros caracteres especiais:** no `.env` use aspas se necessário, ex.:  
`SPRING_DATASOURCE_PASSWORD="Involt1000m!"`
