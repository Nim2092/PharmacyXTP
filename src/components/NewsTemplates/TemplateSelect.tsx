// Template Selector Component for Admin
import React, { useState } from 'react';
import { TEMPLATE_OPTIONS, TemplateType } from './NewsTemplateRenderer';

interface TemplateSelectProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  showPreview?: boolean;
}

export default function TemplateSelect({ 
  selectedTemplate, 
  onTemplateChange, 
  showPreview = true 
}: TemplateSelectProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateType>('template1');

  // Sample post data for preview
  const samplePost = {
    id: 'preview',
    title: 'Tiêu đề bài viết mẫu để xem trước giao diện',
    content: `
      <p>Đây là nội dung mẫu của bài viết để bạn có thể xem trước giao diện template.</p>
      <h2>Tiêu đề phụ</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <blockquote>
        <p>Đây là một trích dẫn trong bài viết.</p>
      </blockquote>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
    `,
    created_at: new Date().toISOString(),
    author: 'Admin',
    category: 'Tin tức',
    image: 'https://via.placeholder.com/800x400?text=Ảnh+mẫu'
  };

  const handlePreview = (template: TemplateType) => {
    setPreviewTemplate(template);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Chọn giao diện hiển thị bài viết
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATE_OPTIONS.map((option) => (
          <div
            key={option.value}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTemplate === option.value
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onTemplateChange(option.value as TemplateType)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{option.label}</h3>
              <span className="text-2xl">{option.preview}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateChange(option.value as TemplateType);
                }}
                className={`px-3 py-1 text-xs rounded ${
                  selectedTemplate === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedTemplate === option.value ? 'Đã chọn' : 'Chọn'}
              </button>
              
              {showPreview && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(option.value as TemplateType);
                  }}
                  className="px-3 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Xem trước
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Xem trước: {TEMPLATE_OPTIONS.find(t => t.value === previewTemplate)?.label}
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <iframe
                srcDoc={`
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                        .prose { max-width: none; }
                        .prose h2 { font-size: 1.5em; font-weight: 600; margin: 1em 0 0.5em 0; }
                        .prose p { margin: 1em 0; line-height: 1.6; }
                        .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; margin: 1em 0; font-style: italic; }
                      </style>
                    </head>
                    <body>
                      <div id="preview-container"></div>
                      <script>
                        // This would render the selected template with sample data
                        document.getElementById('preview-container').innerHTML = '<div class="p-8 text-center text-gray-500">Xem trước template ${previewTemplate}</div>';
                      </script>
                    </body>
                  </html>
                `}
                className="w-full h-96 border-0"
                title="Template Preview"
              />
            </div>
            <div className="p-4 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  onTemplateChange(previewTemplate);
                  setShowPreviewModal(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Chọn template này
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
