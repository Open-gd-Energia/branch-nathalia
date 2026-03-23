#!/bin/bash
# Instala e inicia o backend na VPS. Rode: bash install-vps.sh
set -e
cd "$(dirname "$0")"

echo "=== Criando .env ==="
cat > .env << 'ENVEOF'
SPRING_DATASOURCE_URL=jdbc:postgresql://127.0.0.1:5433/opengd_bd
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=involt2020
ENVEOF

echo "=== Criando start.sh ==="
cat > start.sh << 'SCRIPTEOF'
#!/bin/bash
cd "$(dirname "$0")"
if [ -f .env ]; then
  set -a
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
  set +a
fi
exec java -jar target/opengd-0.0.1-SNAPSHOT.jar "$@"
SCRIPTEOF
chmod +x start.sh

echo "=== Iniciando backend (Ctrl+C para parar) ==="
./start.sh
