"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewsTemplateRenderer from '@/components/NewsTemplates/NewsTemplateRenderer';
import Footer from '@/components/Footer';
// Import mock API và environment config
import { postsAPI } from '@/data/mockPosts';
import { ENV_CONFIG, envLog } from '@/config/environment';
import Navigation from '@/components/navigation';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        envLog('Loading post detail...', { id, useMockData: ENV_CONFIG.USE_MOCK_DATA });
        
        if (ENV_CONFIG.USE_MOCK_DATA) {
          // Sử dụng mock data
          envLog('Using mock data for post detail');
          const mockPost = await postsAPI.getPostById(id as string);
          setPost(mockPost);
          envLog('Mock post loaded successfully', { postId: mockPost?.id });
        } else {
          // Sử dụng real API
          envLog('Using real API for post detail');
          const response = await fetch(`${ENV_CONFIG.API_BASE_URL}${ENV_CONFIG.POST_DETAIL_ENDPOINT(id as string)}`);
          const data = await response.json();
          setPost(data);
          envLog('Real API post loaded successfully', { postId: data?.id });
        }
      } catch (error) {
        envLog('Error loading post detail', error);
        // Fallback to mock data on error
        envLog('Falling back to mock data due to error');
        const fallbackPost = await postsAPI.getPostById(id as string);
        setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy bài viết</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto text-gray-800">
      <Navigation />
      <NewsTemplateRenderer post={post} />
      <Footer />
    </div>
    
  );
}
