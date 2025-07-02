"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewsTemplateRenderer from '@/components/NewsTemplates/NewsTemplateRenderer';
import Footer from '@/components/Footer';
// Import mock API và environment config
import { postsAPI } from '@/data/mockPosts';
import { ENV_CONFIG, envLog } from '@/config/environment';
import Navigation from '@/components/navigation';
import Link from 'next/link';
import style from '@/app/style/styles.module.css';

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
    <main
            className={`${style.mainIndex} w-[70%] bg-white ml-[15%] mr-[15%] relative top-[20vh] flex flex-col shadow-md`}>
            <div className='w-full h-10 bg-[#005db2] flex items-center'>
                <div className='flex justify-end h-full max-w-[1170px] w-full m-auto'>
                    <ul className='p-0 m-0 h-full list-none flex items-center'>
                        <li className='cursor-pointer h-full items-center py-2 relative mr-4'>
                            <Link href={'#'} className='whitespace-nowrap font-sans text-lg text-left flex items-center' id='login' style={{ fontFamily: 'inherit', lineHeight: '1.29', letterSpacing: 'normal', fontWeight: 'normal', fontStretch: 'normal', color: '#ffffff', textDecoration: 'none', }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>Đăng Nhập<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
      <Navigation />
      <NewsTemplateRenderer post={post} />
      <Footer />
    </main>
    
  );
}
