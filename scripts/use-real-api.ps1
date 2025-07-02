# PowerShell script để switch sang Real API mode (cho development với server)
Write-Host "🔄 Switching to Real API mode..." -ForegroundColor Blue

# Update .env.development
$envDevContent = @"
# Development Environment Configuration - REAL API MODE
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=development
"@

$envDevContent | Out-File -FilePath ".env.development" -Encoding utf8

# Update .env.production
$envProdContent = @"
# Environment Configuration - REAL API MODE
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=production
"@

$envProdContent | Out-File -FilePath ".env.production" -Encoding utf8

Write-Host "✅ Switched to Real API mode" -ForegroundColor Green
Write-Host "📋 Current configuration:" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_USE_MOCK=false" -ForegroundColor White
Write-Host "   - API_URL=http://localhost:8080" -ForegroundColor White
Write-Host "   - Ready for development with server" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start development: npm run dev" -ForegroundColor Cyan
Write-Host "🔧 To switch back to Mock Data: .\scripts\use-mock-data.ps1" -ForegroundColor Cyan
