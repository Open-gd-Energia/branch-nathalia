# Setup do projeto - instala dependências e prepara .env
# Uso: .\setup.ps1   (no PowerShell na pasta do projeto)

$ErrorActionPreference = "Stop"

Write-Host "=== Setup opengdflow-front ===" -ForegroundColor Cyan

# 1. Verificar Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Node.js nao encontrado. Instale em https://nodejs.org ou use: winget install OpenJS.NodeJS.LTS" -ForegroundColor Red
    exit 1
}
$nodeVersion = (node -v) -replace 'v', ''
Write-Host "Node.js: $nodeVersion" -ForegroundColor Green

# 2. Verificar/instalar pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm nao encontrado. Instalando globalmente..." -ForegroundColor Yellow
    npm install -g pnpm
}
Write-Host "pnpm: $(pnpm -v)" -ForegroundColor Green

# 3. Criar .env a partir do exemplo se nao existir
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host ".env criado a partir de .env.example - edite e preencha as variaveis." -ForegroundColor Yellow
    } else {
        Write-Host "AVISO: .env.example nao encontrado. Crie um .env com NEXT_PUBLIC_API_URL e NEXTAUTH_SECRET." -ForegroundColor Yellow
    }
} else {
    Write-Host ".env ja existe." -ForegroundColor Green
}

# 4. Instalar dependências
Write-Host "`nInstalando dependencias (pnpm install)..." -ForegroundColor Cyan
pnpm install

Write-Host "`n=== Setup concluido ===" -ForegroundColor Green
Write-Host "Proximo passo: edite o .env se precisar e rode: pnpm dev" -ForegroundColor Cyan
