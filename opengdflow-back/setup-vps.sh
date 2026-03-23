#!/bin/bash
# Executa na VPS para criar .env e start.sh
# Uso: bash setup-vps.sh

cd "$(dirname "$0")"

echo "Criando .env..."
cat > .env << 'ENVEOF'
# Variáveis de ambiente para o backend (Spring Boot)
SPRING_DATASOURCE_URL=jdbc:postgresql://100.75.19.114:5433/opengd_bd
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=involt2020
ENVEOF

echo "Criando start.sh..."
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

echo "Pronto. Agora rode: ./start.sh"
