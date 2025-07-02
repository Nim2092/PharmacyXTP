// Template 2: Minimal Clean Style
import React from 'react';

interface Template2Props {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    author?: string;
    category?: string;
    image?: string;
  };
}

export default function Template2({ post }: Template2Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Minimal Header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-6 leading-relaxed">
            {stripHtml(post.title)}
          </h1>
          <div className="flex items-center text-sm text-gray-500 space-x-6">
            <time>{new Date(post.created_at).toLocaleDateString('vi-VN')}</time>
            {post.author && <span>{post.author}</span>}
            {post.category && (
              <span className="text-gray-700 font-medium">{post.category}</span>
            )}
          </div>
        </div>

        {/* Simple Image */}
        {post.image && (
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={stripHtml(post.title)}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Clean Content */}
        <article className="mb-12">
          <div 
            className="prose prose-xl max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-img:w-full"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Simple Footer */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 font-light text-lg transition-colors duration-200"
          >
            ← Quay lại trang trước
          </button>
        </div>
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
