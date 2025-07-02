# PowerShell script để switch sang Mock Data mode (cho deploy production)
Write-Host "🔄 Switching to Mock Data mode..." -ForegroundColor Blue

# Update .env.production
$envContent = @"
# Environment Configuration - MOCK DATA MODE
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=production
"@

$envContent | Out-File -FilePath ".env.production" -Encoding utf8

Write-Host "✅ Switched to Mock Data mode" -ForegroundColor Green
Write-Host "📋 Current configuration:" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_USE_MOCK=true" -ForegroundColor White
Write-Host "   - Ready for production deploy without server" -ForegroundColor White
Write-Host "   - Recruitment page: Mock data enabled" -ForegroundColor White
Write-Host "   - News/Posts: Mock data enabled" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To build for production: npm run build" -ForegroundColor Cyan
Write-Host "🔧 To switch back to Real API: .\scripts\use-real-api.ps1" -ForegroundColor Cyan
