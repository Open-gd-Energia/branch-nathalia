# Como subir o backend na VPS

## Fluxo recomendado (Linux na VPS)

1. **Git:** deploy key costuma ser só leitura — use `git pull` na VPS; `git push` faça no seu PC (ou chave SSH com escrita).
2. **Não versionar:** pasta `target/` e arquivos `.env` já estão no `.gitignore`.
3. **Compilar com Maven na VPS:**
   ```bash
   cd ~/branch-nathalia/opengdflow-back
   chmod +x mvnw
   ./mvnw package -DskipTests
   ```
4. **Credenciais:** crie `.env` com `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` (a URL do banco vem do perfil **homolog**: `100.75.19.114:5433`).
5. **Subir o JAR** (perfil homolog já está no `start.sh`):
   ```bash
   ./start.sh
   ```
   Ou na mão:
   ```bash
   java -jar target/opengd-0.0.1-SNAPSHOT.jar --spring.profiles.active=homolog
   ```

**Chave SSH no Linux (só pull):** copie a chave pública para GitHub → *Deploy keys* ou use `ssh-keygen` e adicione a pública na conta/equipe com acesso ao repositório.

---

## Opção 1: Execução manual (rápido)

```bash
cd ~/branch-nathalia/opengdflow-back
bash install-vps.sh
```

Para rodar em segundo plano:
```bash
nohup ./start.sh > backend.log 2>&1 &
tail -f backend.log   # ver logs
```

---

## Opção 2: Serviço systemd (recomendado)

O backend sobe automaticamente e reinicia se cair.

```bash
cd ~/branch-nathalia/opengdflow-back

# Criar .env e start.sh
bash setup-vps.sh

# Copiar e ativar o serviço
sudo cp opengd-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable opengd-backend
sudo systemctl start opengd-backend
sudo systemctl status opengd-backend

# Ver logs
sudo journalctl -u opengd-backend -f
```

---

## Se install-vps.sh ou setup-vps.sh não existirem

Copie e cole no terminal:

```bash
cd ~/branch-nathalia/opengdflow-back
cat > .env << 'EOF'
SPRING_DATASOURCE_URL=jdbc:postgresql://100.75.19.114:5433/opengd_bd
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=involt2020
EOF
cat > start.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
[ -f .env ] && set -a && export $(grep -v '^#' .env | grep -v '^$' | xargs) && set +a
exec java -jar target/opengd-0.0.1-SNAPSHOT.jar "$@"
EOF
chmod +x start.sh
./start.sh
```
