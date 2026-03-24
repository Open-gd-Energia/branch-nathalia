#!/bin/bash
# Carrega .env e inicia o backend
# Crie .env na mesma pasta (copie de .env.example) com URL, usuário e senha do banco
# Uso: ./start.sh   ou   bash start.sh

cd "$(dirname "$0")"

# Carrega variáveis do .env
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
  set +a
fi

exec java -jar target/opengd-0.0.1-SNAPSHOT.jar "$@"
