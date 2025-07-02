#!/bin/bash

# Script để switch sang sử dụng Mock Data (cho deploy production)
echo "🔄 Switching to Mock Data mode..."

# Update .env.production
cat > .env.production << EOL
# Environment Configuration - MOCK DATA MODE
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=production
EOL

# Update package.json scripts nếu cần
echo "✅ Switched to Mock Data mode"
echo "📋 Current configuration:"
echo "   - NEXT_PUBLIC_USE_MOCK=true"
echo "   - Ready for production deploy without server"
echo ""
echo "🚀 To build for production: npm run build"
echo "🔧 To switch back to Real API: ./scripts/use-real-api.sh"
