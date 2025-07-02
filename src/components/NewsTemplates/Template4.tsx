// Template 4: Image-Text Layout (Left Image, Right Text) - Responsive
import React from 'react';

interface Template4Props {
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

export default function Template4({ post }: Template4Props) {
  // Process content để làm responsive
  const processContentForResponsive = (content: string) => {
    // Chuyển đổi layout flexbox thành responsive grid
    return content
      .replace(
        /style="display: flex; gap: 30px; margin: 20px 0; align-items: flex-start;"/g,
        'style="display: grid; grid-template-columns: 1fr; gap: 20px; margin: 20px 0;" class="responsive-layout"'
      )
      .replace(
        /style="flex: 0 0 400px;"/g,  
        'style="width: 100%;" class="image-section"'
      )
      .replace(
        /style="flex: 1;"/g,
        'style="width: 100%;" class="content-section"'
      )
      .replace(
        /style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;"/g,
        'style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px;"'
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <style jsx>{`
        .responsive-layout {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        
        @media (min-width: 768px) {
          .responsive-layout {
            grid-template-columns: 400px 1fr !important;
            gap: 30px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .responsive-layout {
            grid-template-columns: 450px 1fr !important;
            gap: 40px !important;
          }
        }
        
        .image-section img {
          width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          border: 3px solid #2dd4bf !important;
          margin-bottom: 15px !important;
        }
        
        .content-section h3 {
          font-size: 14px !important;
          margin-bottom: 10px !important;
        }
        
        @media (min-width: 640px) {
          .content-section h3 {
            font-size: 16px !important;
            margin-bottom: 12px !important;
          }
        }
        
        @media (min-width: 768px) {
          .content-section h3 {
            font-size: 18px !important;
            margin-bottom: 15px !important;
          }
        }
        
        .content-section li {
          margin-bottom: 5px !important;
          font-size: 13px !important;
          line-height: 1.4 !important;
        }
        
        @media (min-width: 640px) {
          .content-section li {
            margin-bottom: 6px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
        }
        
        @media (min-width: 768px) {
          .content-section li {
            margin-bottom: 8px !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2 sm:px-0">
            {stripHtml(post.title)}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-3 md:space-x-4 space-y-2 sm:space-y-0 text-gray-600 text-xs sm:text-sm md:text-base">
            <span className="bg-teal-100 text-teal-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {post.category || 'Sản phẩm'}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
            {post.author && (
              <>
                <span className="hidden sm:inline">•</span>
                <span>Tác giả: {post.author}</span>
              </>
            )}
          </div>
        </div>

        {/* Featured Image (fallback if no image in content) */}
        {post.image && (
          <div className="mb-6 sm:mb-8 md:mb-12 rounded-lg md:rounded-xl overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={stripHtml(post.title)}
              className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-blue-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-li:leading-relaxed prose-blockquote:leading-relaxed prose-ul:pl-4 prose-ol:pl-4"
              dangerouslySetInnerHTML={{ __html: processContentForResponsive(post.content) }} 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 md:mt-12">
          <button 
            onClick={() => window.history.back()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-colors duration-200 text-sm md:text-base shadow-lg hover:shadow-xl"
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
