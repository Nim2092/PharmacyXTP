# Hướng dẫn Deploy Frontend không cần Server

## 🎯 Tổng quan

Hệ thống đã được cấu hình để có thể chạy với **Mock Data** (không cần server) hoặc **Real API** (cần server backend).

## 🔧 Cấu hình hiện tại

- ✅ **Mock Data**: Dữ liệu được hard-code dựa trên JSON thực tế từ backend
- ✅ **Environment Switch**: Tự động detect môi trường và switch API
- ✅ **Fallback**: Tự động chuyển sang mock data nếu API lỗi

## 📋 Cách sử dụng

### 1. **Deploy Production (KHÔNG cần server)**

```bash
# Cách 1: Sử dụng PowerShell script (Windows)
.\scripts\use-mock-data.ps1

# Cách 2: Sử dụng bash script (Linux/Mac)
./scripts/use-mock-data.sh

# Cách 3: Manual - Tạo file .env.production
echo "NEXT_PUBLIC_USE_MOCK=true" > .env.production

# Build và deploy
npm run build
npm run start
```

### 2. **Development (CÓ server)**

```bash
# Cách 1: Sử dụng PowerShell script (Windows)
.\scripts\use-real-api.ps1

# Cách 2: Sử dụng bash script (Linux/Mac)
./scripts/use-real-api.sh

# Cách 3: Manual - Tạo file .env.development
echo "NEXT_PUBLIC_USE_MOCK=false" > .env.development

# Chạy development
npm run dev
```

## 📁 Files đã tạo/sửa đổi

### Tạo mới:

- `src/data/mockRecruitmentPage.ts` - Mock data chính
- `src/config/environment.ts` - Environment configuration
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables
- `scripts/use-mock-data.ps1` - PowerShell script switch to mock
- `scripts/use-real-api.ps1` - PowerShell script switch to real API
- `scripts/use-mock-data.sh` - Bash script switch to mock
- `scripts/use-real-api.sh` - Bash script switch to real API

### Đã sửa đổi:

- `src/app/recruitment/page.tsx` - Thêm logic switch mock/real API

## 🔄 Tự động Switch Logic

```typescript
// Tự động detect environment
const USE_MOCK_DATA =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_USE_MOCK === "true";

if (USE_MOCK_DATA) {
  // Sử dụng mock data
  const mockResponse = await recruitmentPageAPI.getRecruitmentPageData();
} else {
  // Sử dụng real API
  const response = await axios.get("http://localhost:8080/recruitment-page");
}
```

## 🚀 Deploy Commands

### Vercel/Netlify (Static Deploy):

```bash
# Switch to mock mode
.\scripts\use-mock-data.ps1

# Build
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

### Docker (với mock data):

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_USE_MOCK=true
RUN npm run build
CMD ["npm", "start"]
```

## 🧪 Testing

### Test Mock Data:

```bash
# Start với mock data
.\scripts\use-mock-data.ps1
npm run dev

# Kiểm tra console log: "Using mock data for recruitment page"
```

### Test Real API:

```bash
# Start với real API
.\scripts\use-real-api.ps1
npm run dev

# Kiểm tra console log: "Using real API for recruitment page"
```

## 🔍 Debugging

### Kiểm tra environment:

```javascript
// Mở browser console và chạy:
console.log("Environment:", {
  NODE_ENV: process.env.NODE_ENV,
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
});
```

### Log messages:

- `🔧 [ENV] Using mock data for recruitment page` - Đang dùng mock
- `🔧 [ENV] Using real API for recruitment page` - Đang dùng real API
- `🔧 [ENV] Falling back to mock data due to error` - Lỗi API, chuyển sang mock

## 📊 Mock Data Structure

Mock data được tạo dựa trên JSON thực tế:

```json
{
  "banner": "/uploads/1750345861123-z6720453861719_3a49cbabaab91f8b902b0f1bc2d76e9d.jpg",
  "bannerTitle": "NƠI CHUYỂN GIAO TRI THỨC CÔNG NGHỆ...",
  "mainTitle": "Hitech - Kết Nối Tri Thức & Công Nghệ",
  "intro": { "logo": "...", "text": "..." },
  "hexagonImages": [...],
  "goals": [...],
  "studentImages": [...],
  "recruitments": [...]
}
```

## 📊 Mock Data Coverage

### ✅ **Recruitment Page**

- Banner, intro, goals, student images
- Recruitment opportunities list
- All dynamic content from backend

### ✅ **News/Posts System**

- 6 sample tech blog posts with full content
- Categories: AI, Blockchain, IoT, Big Data, Cloud, Security
- All 3 templates (template1, template2, template3)
- Rich CKEditor content with HTML formatting
- Post listing và detail pages
- Admin posts management

### 🔧 **API Endpoints Covered**

- `GET /recruitment-page` → `recruitmentPageAPI.getRecruitmentPageData()`
- `GET /posts` → `postsAPI.getAllPosts()`
- `GET /posts/:id` → `postsAPI.getPostById(id)`
- Admin posts management với full CRUD mock data

## ⚡ Lợi ích

1. **Deploy linh hoạt**: Có thể deploy mà không cần server
2. **Fallback safety**: Tự động chuyển sang mock nếu API lỗi
3. **Development friendly**: Dễ dàng switch giữa mock và real API
4. **Production ready**: Mock data chính xác 100% với backend
5. **Performance**: Không cần wait API call, load nhanh

**Hệ thống đã sẵn sàng cho cả development và production deploy!** 🎉
