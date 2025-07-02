#!/bin/bash

# Script để switch sang sử dụng Real API (cho development với server)
echo "🔄 Switching to Real API mode..."

# Update .env.development
cat > .env.development << EOL
# Development Environment Configuration - REAL API MODE
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=development
EOL

# Update .env.production để cũng dùng real API nếu cần
cat > .env.production << EOL
# Environment Configuration - REAL API MODE
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=production
EOL

echo "✅ Switched to Real API mode"
echo "📋 Current configuration:"
echo "   - NEXT_PUBLIC_USE_MOCK=false"
echo "   - API_URL=http://localhost:8080"
echo "   - Ready for development with server"
echo ""
echo "🚀 To start development: npm run dev"
echo "🔧 To switch back to Mock Data: ./scripts/use-mock-data.sh"
