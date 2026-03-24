FROM node:20-alpine

# Instala o pnpm globalmente dentro do container
RUN npm install -g pnpm

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala as dependências usando pnpm
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

# pnpm run dev → hot-reload, adequado para homolog na VPS
# Para produção (mais rápido), trocar por: pnpm build && pnpm start
CMD ["pnpm", "run", "dev"]
