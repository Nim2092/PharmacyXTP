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
      
      {/* Responsive CSS cho mock data content */}
      <style jsx>{`
        /* Responsive styles cho mock data content */
        .prose :global(div[style*="display: flex"]) {
          display: flex !important;
          gap: 30px;
          margin: 20px 0;
          align-items: flex-start;
        }
        
        .prose :global(div[style*="flex: 0 0 400px"]) {
          flex: 0 0 400px;
        }
        
        .prose :global(div[style*="flex: 1"]) {
          flex: 1;
        }
        
        .prose :global(div[style*="display: grid"]) {
          display: grid !important;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        /* Mobile responsive overrides */
        @media (max-width: 767px) {
          .prose :global(div[style*="display: flex"]) {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
          .prose :global(div[style*="flex: 0 0 400px"]) {
            flex: none !important;
            width: 100% !important;
          }
          
          .prose :global(div[style*="display: grid"]) {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          
          .prose :global(img[style*="border-radius"]) {
            width: 100% !important;
            height: auto !important;
            border-radius: 8px !important;
            border: 2px solid #2dd4bf !important;
            margin-bottom: 10px !important;
          }
          
          .prose :global(h2[style*="text-align: center"]) {
            font-size: 18px !important;
            margin-bottom: 15px !important;
          }
          
          .prose :global(h3[style*="color: #1e40af"]) {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }
          
          .prose :global(h4[style*="color"]) {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }
        }
        
        /* Tablet responsive */
        @media (min-width: 768px) and (max-width: 1279px) {
          .prose :global(div[style*="flex: 0 0 400px"]) {
            flex: 0 0 300px !important;
          }
          
          .prose :global(div[style*="display: flex"]) {
            gap: 20px !important;
          }
          
          .prose :global(img[style*="border-radius"]) {
            border: 2px solid #2dd4bf !important;
            margin-bottom: 12px !important;
          }
          
          .prose :global(h2[style*="text-align: center"]) {
            font-size: 22px !important;
          }
          
          .prose :global(h3[style*="color: #1e40af"]) {
            font-size: 17px !important;
          }
        }
        
        /* Desktop enhancements */
        @media (min-width: 1280px) {
          .prose :global(div[style*="display: flex"]) {
            gap: 35px !important;
          }
          
          .prose :global(div[style*="flex: 0 0 400px"]) {
            flex: 0 0 450px !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Responsive Title */}
        <div className="text-center py-6 md:py-8 xl:py-12">
          {/* Desktop Title (≥1280px) */}
          <h1 className="hidden xl:block text-5xl font-bold text-gray-900 mb-6 leading-tight px-4 mt-20 ">
            {stripHtml(post.title)}
          </h1>
          
          {/* Tablet Title (768px - 1279px) */}
          <h1 className="hidden md:block xl:hidden text-3xl font-bold text-gray-900 mb-4 leading-tight px-4">
            {stripHtml(post.title)}
          </h1>
          
          {/* Mobile Title (≤767px) */}
          <h1 className="block md:hidden text-xl font-bold text-gray-900 mb-3 leading-tight px-2">
            {stripHtml(post.title)}
          </h1>

          {/* Meta Info - Responsive */}
          {/* Desktop Meta (≥1280px) */}
          <div className="hidden xl:flex flex-row items-center justify-center space-x-4 text-gray-600 text-base">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.category || 'Tin tức'}
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-medium">{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            {post.author && (
              <>
                <span className="text-gray-400">•</span>
                <span className="font-medium">Tác giả: {post.author}</span>
              </>
            )}
          </div>
          
          {/* Tablet Meta (768px - 1279px) */}
          <div className="hidden md:flex xl:hidden flex-row items-center justify-center space-x-3 text-gray-600 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.category || 'Tin tức'}
            </span>
            <span className="text-gray-400">•</span>
            <span className="font-medium">{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            {post.author && (
              <>
                <span className="text-gray-400">•</span>
                <span className="font-medium">Tác giả: {post.author}</span>
              </>
            )}
          </div>
          
          {/* Mobile Meta (≤767px) */}
          <div className="flex md:hidden flex-col items-center space-y-2 text-gray-600 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {post.category || 'Tin tức'}
            </span>
            <span className="font-medium">{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            {post.author && <span className="font-medium">Tác giả: {post.author}</span>}
          </div>
        </div>

        {/* Featured Image Section - Responsive */}
        {post.image && (
          <>
            {/* Desktop Image (≥1280px) */}
            <div className="hidden xl:block mb-12 px-8">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={post.image} 
                  alt={stripHtml(post.title)}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Tablet Image (768px - 1279px) */}
            <div className="hidden md:block xl:hidden mb-8 px-6">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={post.image} 
                  alt={stripHtml(post.title)}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            
            {/* Mobile Image (≤767px) */}
            <div className="block md:hidden mb-4 px-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={post.image} 
                  alt={stripHtml(post.title)}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          </>
        )}

        {/* Content Section - Responsive */}
        {/* Desktop Content (≥1280px) */}
        <div className="hidden xl:block px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div 
                className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-li:leading-relaxed prose-blockquote:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
          </div>
        </div>
        
        {/* Tablet Content (768px - 1279px) */}
        <div className="hidden md:block xl:hidden px-6 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div 
                className="prose prose-base max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-li:leading-relaxed prose-blockquote:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
          </div>
        </div>
        
        {/* Mobile Content (≤767px) */}
        <div className="block md:hidden px-4 pb-6">
          <div className="bg-white rounded-lg shadow-xl p-4">
            <div 
              className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-li:leading-relaxed prose-blockquote:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </div>

        {/* Footer Section - Responsive Back Button */}
        <div className="text-center pb-6 md:pb-8 xl:pb-12">
          {/* Desktop Button (≥1280px) */}
          <button 
            onClick={() => window.history.back()}
            className="hidden xl:inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 text-base shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ← Quay lại
          </button>
          
          {/* Tablet Button (768px - 1279px) */}
          <button 
            onClick={() => window.history.back()}
            className="hidden md:inline-block xl:hidden bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors duration-200 text-base shadow-lg hover:shadow-xl"
          >
            ← Quay lại
          </button>
          
          {/* Mobile Button (≤767px) */}
          <button 
            onClick={() => window.history.back()}
            className="inline-block md:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
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
