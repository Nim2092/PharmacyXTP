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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-6xl">
        {/* Minimal Header */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6 md:pb-8 mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2 sm:px-0">
            {stripHtml(post.title)}
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <time>{new Date(post.created_at).toLocaleDateString('vi-VN')}</time>
            {post.author && <span>{post.author}</span>}
            {post.category && (
              <span className="text-gray-700 font-medium">{post.category}</span>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          
          {/* Mobile & Tablet Layout: Vertical Stack */}
          <div className="block xl:hidden">
            {/* Simple Image for Mobile/Tablet */}
            {post.image && (
              <div className="mb-4 sm:mb-6 md:mb-8">
                <img 
                  src={post.image} 
                  alt={stripHtml(post.title)}
                  className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Clean Content for Mobile/Tablet */}
            <article className="mb-6 sm:mb-8 md:mb-12">
              <div 
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-loose prose-img:w-full prose-img:rounded-lg prose-li:leading-loose prose-blockquote:leading-loose"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>
          </div>

          {/* Desktop Layout: Left Image + Right Content */}
          <div className="hidden xl:block">
            <div className="grid grid-cols-12 gap-8 2xl:gap-12">
              {/* Left Side - Simple Image */}
              {post.image && (
                <div className="col-span-5">
                  <div className="sticky top-8">
                    <img 
                      src={post.image} 
                      alt={stripHtml(post.title)}
                      className="w-full h-80 2xl:h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
              
              {/* Right Side - Clean Content */}
              <div className={post.image ? "col-span-7" : "col-span-12"}>
                <article>
                  <div 
                    className="prose prose-lg 2xl:prose-xl max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:text-lg prose-p:leading-loose prose-img:w-full prose-img:rounded-lg prose-li:text-lg prose-li:leading-loose prose-blockquote:text-lg prose-blockquote:leading-loose"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
                </article>
              </div>
            </div>
          </div>

        </div>

        {/* Simple Footer */}
        <div className="border-t border-gray-200 pt-4 sm:pt-6 md:pt-8 text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 font-light text-sm sm:text-base md:text-lg transition-colors duration-200 px-4 py-2"
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
