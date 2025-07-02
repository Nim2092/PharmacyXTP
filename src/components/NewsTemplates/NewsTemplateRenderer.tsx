// Dynamic Template Renderer
import React from 'react';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';

interface NewsTemplateRendererProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    author?: string;
    category?: string;
    image?: string;
    template?: string; // Template selector field
  };
}

export default function NewsTemplateRenderer({ post }: NewsTemplateRendererProps) {
  // Default template nếu không có hoặc không hợp lệ
  const templateType = post.template || 'template1';

  switch (templateType) {
    case 'template1':
      return <Template1 post={post} />;
    case 'template2':
      return <Template2 post={post} />;
    case 'template3':
      return <Template3 post={post} />;
    case 'template4':
      return <Template4 post={post} />;
    default:
      return <Template1 post={post} />; // Fallback
  }
}

// Export types để sử dụng ở nơi khác
export type TemplateType = 'template1' | 'template2' | 'template3' | 'template4';

export const TEMPLATE_OPTIONS = [
  {
    value: 'template1',
    label: 'Modern Magazine',
    description: 'Hiện đại, màu sắc sống động với gradient',
    preview: '🎨 Magazine Style'
  },
  {
    value: 'template2',
    label: 'Minimal Clean',
    description: 'Tối giản, sạch sẽ, tập trung vào nội dung',
    preview: '📃 Minimal Style'
  },
  {
    value: 'template3',
    label: 'Corporate Professional',
    description: 'Chuyên nghiệp, phù hợp với doanh nghiệp',
    preview: '🏢 Corporate Style'
  },
  {
    value: 'template4',
    label: 'Image-Text Layout',
    description: 'Layout hình ảnh bên trái, nội dung bên phải - Responsive',
    preview: '🖼️ Image-Text Layout'
  }
];
