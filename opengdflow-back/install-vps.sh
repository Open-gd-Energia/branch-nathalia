#!/bin/bash
# Instala e inicia o backend na VPS. Rode: bash install-vps.sh
set -e
cd "$(dirname "$0")"

echo "=== Criando .env ==="
cat > .env << 'ENVEOF'
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=involt2020
OPENGD_URL_FRONTEND=https://branch-nathalia.vercel.app
ENVEOF

echo "=== Criando start.sh ==="
cat > start.sh << 'SCRIPTEOF'
#!/bin/bash
cd "$(dirname "$0")"
if [ -f .env ]; then
  set -a
  export $(grep -v '^#' .env | grep -v '^$' | grep -v '^<<<<<<<' | grep -v '^=======' | grep -v '^>>>>>>>' | xargs)
  set +a
fi
exec java -jar target/opengd-0.0.1-SNAPSHOT.jar --spring.profiles.active=homolog --spring.jpa.hibernate.ddl-auto=none "$@"
SCRIPTEOF
chmod +x start.sh

echo "=== Iniciando backend (Ctrl+C para parar) ==="
./start.sh
