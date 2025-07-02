// Template 3: Corporate Professional Style
import React from 'react';

interface Template3Props {
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

export default function Template3({ post }: Template3Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Corporate Header */}
      <div className="bg-[#1553ad] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <span className="bg-white bg-opacity-20 text-white px-4 py-2 rounded text-sm font-medium">
                {post.category || 'THÔNG BÁO'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {stripHtml(post.title)}
            </h1>
            <div className="flex items-center text-blue-100 space-x-6">
              <span>📅 {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              {post.author && <span>✍️ {post.author}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {post.image && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={post.image} 
                    alt={stripHtml(post.title)}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-[#1553ad] prose-p:text-gray-700 prose-img:rounded-lg prose-img:shadow-md prose-a:text-[#1553ad]"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-[#1553ad] font-bold text-lg mb-4">Thông tin bài viết</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">Ngày đăng:</span>
                    <span className="ml-2">{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  {post.author && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Tác giả:</span>
                      <span className="ml-2">{post.author}</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">Danh mục:</span>
                      <span className="ml-2">{post.category}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => window.history.back()}
                    className="w-full bg-[#1553ad] hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors duration-200"
                  >
                    ← Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
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
