'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
// Import mock API và environment config
import { postsAPI } from '@/data/mockPosts';
import { ENV_CONFIG, envLog } from '@/config/environment';

// Hàm loại bỏ thẻ HTML khỏi title
function stripHtml(html: string) {
  if (!html) return '';
  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  return html.replace(/<[^>]+>/g, '');
}

export default function PostList({ onDeleted }: { onDeleted?: () => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      envLog('Loading posts for admin...', { useMockData: ENV_CONFIG.USE_MOCK_DATA });
      
      if (ENV_CONFIG.USE_MOCK_DATA) {
        // Sử dụng mock data (bao gồm cả draft posts cho admin)
        envLog('Using mock data for admin posts');
        const { mockPostsData } = await import('@/data/mockPosts');
        setPosts(mockPostsData); // Admin có thể xem tất cả posts
        envLog('Mock admin posts loaded successfully', { count: mockPostsData.length });
      } else {
        // Sử dụng real API
        envLog('Using real API for admin posts');
        const response = await fetch(`${ENV_CONFIG.API_BASE_URL}${ENV_CONFIG.POSTS_ENDPOINT}`);
        const data = await response.json();
        setPosts(data);
        envLog('Real API admin posts loaded successfully', { count: data.length });
      }
    } catch (error) {
      envLog('Error loading admin posts', error);
      // Fallback to mock data
      const { mockPostsData } = await import('@/data/mockPosts');
      setPosts(mockPostsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      onDeleted && onDeleted();
    } catch (err) {
      alert('Lỗi xóa bài viết!');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách bài viết</h2>
      {loading ? <div>Đang tải...</div> : (
        <div className="space-y-4">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex gap-4">
                {post.image && (
                  <img
                    src={post.image}
                    alt="Ảnh đại diện"
                    className="w-32 h-24 object-cover rounded border flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/posts/${post.id}`} className="font-semibold text-blue-700 hover:underline block mb-2">
                    {stripHtml(post.title)}
                  </Link>
                  
                  {/* Post metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                    <div><strong>Tác giả:</strong> {post.author || 'Chưa có'}</div>
                    <div><strong>Danh mục:</strong> {post.category || 'Chưa có'}</div>
                    <div><strong>Template:</strong> <span className="capitalize">{post.template || 'template1'}</span></div>
                    <div><strong>Trạng thái:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        post.status === 'published' ? 'bg-green-100 text-green-800' :
                        post.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status === 'published' ? 'Đã xuất bản' :
                         post.status === 'archived' ? 'Lưu trữ' : 'Bản nháp'}
                      </span>
                    </div>
                  </div>

                  {/* Creation date */}
                  <div className="text-sm text-gray-500 mb-3">
                    Ngày tạo: {post.created_at ? new Date(post.created_at).toLocaleDateString('vi-VN') : '---'}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-center text-sm"
                    title="Xem chi tiết"
                  >
                    Xem
                  </Link>
                  <Link
                    href={`/admin/posts/${post.id}?edit=1`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 text-center text-sm"
                    title="Sửa bài viết"
                  >
                    Sửa
                  </Link>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-sm"
                    onClick={() => handleDelete(post.id)}
                    title="Xóa bài viết"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}