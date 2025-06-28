'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

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

  const fetchPosts = () => {
    setLoading(true);
    fetch('http://localhost:8080/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
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
        <ul>
          {posts.map((post: any) => (
            <li key={post.id} className="mb-2 flex items-center gap-4">
              {post.image && (
                <img
                  src={post.image}
                  alt="Ảnh đại diện"
                  className="w-72 h-48 object-cover rounded mr-2 border"
                  style={{ minWidth: 64, minHeight: 64 }}
                />
              )}
              <Link href={`/admin/posts/${post.id}`} className="font-semibold text-blue-700 hover:underline flex-1">
                {stripHtml(post.title)}
              </Link>
              <span className="text-gray-500">{post.status}</span>
              <Link
                href={`/admin/posts/${post.id}?edit=1`}
                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                title="Sửa bài viết"
              >
                Sửa
              </Link>
              <button
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(post.id)}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}