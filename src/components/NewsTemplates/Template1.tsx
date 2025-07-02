// Template 1: Modern Magazine Style
import React from 'react';

interface Template1Props {
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

export default function Template1({ post }: Template1Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {stripHtml(post.title)}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {post.category || 'Tin tức'}
            </span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            {post.author && (
              <>
                <span>•</span>
                <span>Tác giả: {post.author}</span>
              </>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={post.image} 
              alt={stripHtml(post.title)}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200"
          >
            ← Quay lại
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
