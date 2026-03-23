# Como subir o projeto localmente

## Pré-requisitos

- **Node.js 20** (para o frontend)
- **Java 21** (para o backend)
- **PostgreSQL** (porta 5432)
- **pnpm** (`npm install -g pnpm`)

---

## Opção 1 — Manual (recomendado para desenvolvimento)

### 1. Banco de dados PostgreSQL

Crie o banco e o usuário:

```sql
CREATE DATABASE opengd;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE opengd TO postgres;
```

Ou use pgAdmin/DBeaver para criar o banco `opengd`.

### 2. Backend (Spring Boot)

O backend usa o banco na VPS por padrão. Para sobrescrever (opcional):

```powershell
$env:SPRING_DATASOURCE_URL="jdbc:postgresql://100.75.19.114:5433/opengd_bd"
$env:SPRING_DATASOURCE_USERNAME="postgres"
$env:SPRING_DATASOURCE_PASSWORD="sua_senha"
cd opengdflow-back
./mvnw spring-boot:run
```

Ou crie `.env` na pasta `opengdflow-back` (veja `.env.example`).

O backend sobe em **http://localhost:8080**.

### 3. Frontend (Next.js)

Em outro terminal:

```powershell
cd opengdflow-front
```

Crie o arquivo `.env` a partir do exemplo:

```powershell
copy .env.example .env
```

Edite o `.env` e defina `NEXTAUTH_SECRET` (gere com `openssl rand -base64 32`).

Depois:

```powershell
pnpm install
pnpm dev
```

O frontend sobe em **http://localhost:3000**.

### 4. Acessar

Abra **http://localhost:3000** e faça login com um usuário cadastrado no backend.

---

## Opção 2 — Docker

O `docker-compose.yml` na raiz usa pastas `OPENGDFLOW-BACK` e `OPENGDFLOW-FRONT`. Se suas pastas forem `opengdflow-back` e `opengdflow-front`, ajuste o docker-compose ou use symlinks.

Para subir tudo com Docker (após ajustar os caminhos):

```powershell
docker-compose up -d
```

---

## Resumo rápido

| Serviço   | Comando                       | URL              |
|-----------|-------------------------------|------------------|
| PostgreSQL| (rodando local ou Docker)     | localhost:5432   |
| Backend   | `./mvnw spring-boot:run`      | http://localhost:8080 |
| Frontend  | `pnpm dev`                    | http://localhost:3000 |

**Ordem:** 1) PostgreSQL → 2) Backend → 3) Frontend.
