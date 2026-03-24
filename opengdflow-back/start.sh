#!/bin/bash
# Carrega .env e inicia o backend
# Crie .env na mesma pasta (copie de .env.example) com URL, usuário e senha do banco
# Uso: ./start.sh   ou   bash start.sh

cd "$(dirname "$0")"

# Carrega variáveis do .env (ignora linhas vazias, comentários e marcadores de conflito de merge)
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | grep -v '^$' | grep -v '^<<<<<<<' | grep -v '^=======' | grep -v '^>>>>>>>' | xargs)
  set +a
fi

# homolog + ddl-auto=none na linha de comando (sobrescreve SPRING_JPA_* no .env que ativam validate/update)
exec java -jar target/opengd-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=homolog \
  --spring.jpa.hibernate.ddl-auto=none \
  "$@"
