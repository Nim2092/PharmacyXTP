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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
              <span className="bg-white bg-opacity-20 text-white px-2 sm:px-3 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm font-medium">
                {post.category || 'THÔNG BÁO'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 sm:px-0">
              {stripHtml(post.title)}
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center text-blue-100 space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs sm:text-sm md:text-base">
              <span className="flex items-center">📅 {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
              {post.author && <span className="flex items-center">✍️ {post.author}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {post.image && (
                <div className="mb-4 sm:mb-6 md:mb-8 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={post.image} 
                    alt={stripHtml(post.title)}
                    className="w-full h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                <div 
                  className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none prose-headings:text-[#1553ad] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-loose prose-img:rounded-lg prose-img:shadow-md prose-a:text-[#1553ad] prose-li:leading-loose prose-blockquote:leading-loose"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 lg:sticky lg:top-8">
                <h3 className="text-[#1553ad] font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Thông tin bài viết</h3>
                <div className="space-y-1 sm:space-y-2 md:space-y-3 text-xs md:text-sm">
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start text-gray-600">
                    <span className="font-medium mb-1 sm:mb-0 sm:mr-2 lg:mr-0 lg:mb-1">Ngày đăng:</span>
                    <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  {post.author && (
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start text-gray-600">
                      <span className="font-medium mb-1 sm:mb-0 sm:mr-2 lg:mr-0 lg:mb-1">Tác giả:</span>
                      <span>{post.author}</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start text-gray-600">
                      <span className="font-medium mb-1 sm:mb-0 sm:mr-2 lg:mr-0 lg:mb-1">Danh mục:</span>
                      <span>{post.category}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => window.history.back()}
                    className="w-full bg-[#1553ad] hover:bg-blue-700 text-white px-2 sm:px-3 md:px-4 py-2 rounded font-medium transition-colors duration-200 text-xs sm:text-sm md:text-base"
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
