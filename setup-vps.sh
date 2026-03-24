#!/bin/bash
# =============================================================
# setup-vps.sh — Configura e sobe toda a stack na VPS
# Uso: bash setup-vps.sh
# =============================================================
set -e
cd "$(dirname "$0")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()    { echo -e "${GREEN}[OK]${NC} $1"; }
warn()   { echo -e "${YELLOW}[AVISO]${NC} $1"; }
err()    { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }
title()  { echo -e "\n${YELLOW}=== $1 ===${NC}"; }

# -----------------------------------------------------------
# 1. Verifica Docker
# -----------------------------------------------------------
title "1. Verificando Docker"
if ! command -v docker &>/dev/null; then
  warn "Docker não encontrado. Instalando..."
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker "$USER"
  log "Docker instalado. Reinicie a sessão SSH se tiver permissão negada."
else
  log "Docker $(docker --version | cut -d' ' -f3 | tr -d ',')"
fi

if ! docker compose version &>/dev/null; then
  warn "Docker Compose plugin não encontrado. Instalando..."
  sudo apt-get update -qq
  sudo apt-get install -y docker-compose-plugin
fi
log "Docker Compose $(docker compose version --short)"

# -----------------------------------------------------------
# 2. Verifica arquivo .env
# -----------------------------------------------------------
title "2. Verificando .env"
if [ ! -f .env ]; then
  err "Arquivo .env não encontrado! Crie o .env na raiz do projeto com as variáveis necessárias."
fi
source .env
log ".env carregado"

# Valida variáveis obrigatórias
[ -z "$DB_PASSWORD" ]       && err "DB_PASSWORD não definido no .env"
[ -z "$NEXTAUTH_SECRET" ]   && err "NEXTAUTH_SECRET não definido no .env"
log "Variáveis obrigatórias presentes"

# -----------------------------------------------------------
# 3. Testa conectividade com o banco local (opgdbd em 127.0.0.1:5432)
# -----------------------------------------------------------
title "3. Testando banco de dados local (127.0.0.1:5432)"
if nc -zv 127.0.0.1 5432 -w 5 2>/dev/null; then
  log "Banco local acessível em 127.0.0.1:5432"
else
  warn "Não foi possível conectar ao banco local. Verifique se o container 'opgdbd' está rodando:"
  warn "  sudo docker ps | grep opgdbd"
  warn "Continuando mesmo assim..."
fi

# -----------------------------------------------------------
# 4. Para containers antigos (se existirem)
# -----------------------------------------------------------
title "4. Parando containers antigos"
docker compose down --remove-orphans 2>/dev/null || true
log "Containers parados"

# -----------------------------------------------------------
# 5. Build e subida dos containers
# -----------------------------------------------------------
title "5. Build e subida dos containers"
log "Isso pode demorar alguns minutos na primeira vez (compilando Java + Node)..."
docker compose up -d --build

# -----------------------------------------------------------
# 6. Aguarda backend subir
# -----------------------------------------------------------
title "6. Aguardando backend inicializar"
MAX_WAIT=120
WAITED=0
echo -n "Aguardando backend em localhost:8080"
while ! curl -s http://localhost:8080/version > /dev/null 2>&1; do
  echo -n "."
  sleep 3
  WAITED=$((WAITED + 3))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo ""
    warn "Backend demorou mais de ${MAX_WAIT}s para responder. Verifique os logs:"
    echo "  docker logs opengd_back --tail=50"
    break
  fi
done
echo ""
if curl -s http://localhost:8080/version > /dev/null 2>&1; then
  log "Backend respondendo em localhost:8080"
fi

# -----------------------------------------------------------
# 7. Aplica migration SQL V012 (novos campos da fatura)
# -----------------------------------------------------------
title "7. Aplicando migration V012 no banco local"
if command -v psql &>/dev/null; then
  PGPASSWORD="$DB_PASSWORD" psql \
    -h 127.0.0.1 -p 5432 \
    -U "${DB_USERNAME:-admin}" \
    -d opengd_bd \
    -f opengdflow-back/src/main/resources/db/migration/V012__fatura_campos_fattureweb_UP.sql \
    && log "Migration V012 aplicada com sucesso" \
    || warn "Migration V012 falhou ou já foi aplicada — verifique manualmente"
else
  warn "psql não encontrado no PATH. Instale com: sudo apt-get install postgresql-client"
  warn "Ou rode via docker exec no container do banco:"
  warn "  sudo docker exec -i opgdbd psql -U ${DB_USERNAME:-admin} -d opengd_bd < opengdflow-back/src/main/resources/db/migration/V012__fatura_campos_fattureweb_UP.sql"
fi

# -----------------------------------------------------------
# 8. Status final
# -----------------------------------------------------------
title "8. Status dos containers"
docker compose ps

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Deploy concluído!${NC}"
echo -e "${GREEN}  Backend:  http://100.74.229.30:8080${NC}"
echo -e "${GREEN}  Frontend: http://100.74.229.30:3000${NC}"
echo -e "${GREEN}  Swagger:  http://100.74.229.30:8080/swagger-ui/index.html${NC}"
echo -e "${GREEN}  Logs:     docker compose logs -f${NC}"
echo -e "${GREEN}============================================${NC}"
