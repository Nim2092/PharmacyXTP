"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${id}`)
      .then(res => res.json())
      .then(setPost);
  }, [id]);

  if (!post) return <div>Đang tải...</div>;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto flex items-start justify-center">
      <div className="w-full w-2/3 p-6 mt-32 bg-white rounded-lg text-gray-800">
        <h1 className="text-2xl font-bold mb-2 mt-24">{stripHtml(post.title)}</h1>
        <div className="text-gray-500 mb-4">
          {post.created_at ? new Date(post.created_at).toLocaleDateString('vi-VN') : ''}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}

function stripHtml(html: string) {
  if (!html) return '';
  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  return html.replace(/<[^>]+>/g, '');
}
