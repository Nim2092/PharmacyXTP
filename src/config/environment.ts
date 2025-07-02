// Environment configuration để switch giữa mock data và real API
export const ENV_CONFIG = {
  // Đặt USE_MOCK_DATA = true để sử dụng mock data (khi deploy không có server)
  // Đặt USE_MOCK_DATA = false để sử dụng real API (khi có server)
  USE_MOCK_DATA: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  
  // API endpoints
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  
  // Recruitment API endpoints
  RECRUITMENT_PAGE_ENDPOINT: '/recruitment-page',
  
  // Posts/News API endpoints
  POSTS_ENDPOINT: '/posts',
  POST_DETAIL_ENDPOINT: (id: string | number) => `/posts/${id}`,
  
  // Logging
  ENABLE_LOGS: process.env.NODE_ENV === 'development',
};

// Utility function để log theo environment
export const envLog = (message: string, data?: any) => {
  if (ENV_CONFIG.ENABLE_LOGS) {
    console.log(`🔧 [ENV] ${message}`, data || '');
  }
};

// Function để detect environment
export const getEnvironmentInfo = () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    useMockData: ENV_CONFIG.USE_MOCK_DATA,
    apiBaseUrl: ENV_CONFIG.API_BASE_URL,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  };
};
