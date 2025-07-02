'use client';

import React, { useState, useEffect } from 'react';
import './preview-templates.css';

interface ContentBlock {
  type: 'text' | 'image';
  content: string;
  order: number;
}

interface PreviewTemplatesProps {
  content: string;  // HTML content from CKEditor
  title: string;
  template?: 'classic' | 'magazine' | 'modern';
  image?: string;   // Featured image URL
  createdAt?: string;
}

export default function PreviewTemplates({ 
  content, 
  title, 
  template = 'classic',
  image,
  createdAt 
}: PreviewTemplatesProps) {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  // Parse HTML content thành blocks
  useEffect(() => {
    if (!content) return;
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const blocks: ContentBlock[] = [];
    let order = 0;

    // Extract text và images từ HTML
    const walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      const element = node as Element;
      
      if (element.tagName === 'IMG') {
        blocks.push({
          type: 'image',
          content: element.outerHTML,
          order: order++
        });
      } else if (element.tagName === 'P' && element.textContent?.trim()) {
        blocks.push({
          type: 'text',
          content: element.outerHTML,
          order: order++
        });
      } else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
        blocks.push({
          type: 'text',
          content: element.outerHTML,
          order: order++
        });
      }
    }

    setContentBlocks(blocks);
  }, [content]);

  const renderClassicLayout = () => (
    <div className="preview-classic">
      <h1 className="preview-title">{title}</h1>
      
      {/* Featured Image */}
      {image && (
        <div className="classic-featured-image">
          <img src={image} alt="Ảnh đại diện" className="featured-img" />
        </div>
      )}
      
      {/* Meta Info */}
      {createdAt && (
        <div className="meta-info">
          Ngày tạo: {new Date(createdAt).toLocaleString()}
        </div>
      )}
      
      {contentBlocks.map((block, index) => (
        <div key={index} className="classic-block">
          {block.type === 'text' ? (
            <div 
              className="classic-text" 
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          ) : (
            <div 
              className="classic-image"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderMagazineLayout = () => {
    const textBlocks = contentBlocks.filter(b => b.type === 'text');
    const imageBlocks = contentBlocks.filter(b => b.type === 'image');
    
    return (
      <div className="preview-magazine">
        <h1 className="preview-title">{title}</h1>
        
        {/* Featured Image */}
        {image && (
          <div className="magazine-featured-image">
            <img src={image} alt="Ảnh đại diện" className="featured-img" />
          </div>
        )}
        
        {/* Meta Info */}
        {createdAt && (
          <div className="meta-info">
            Ngày tạo: {new Date(createdAt).toLocaleString()}
          </div>
        )}
        
        <div className="magazine-grid">
          <div className="magazine-text">
            {textBlocks.map((block, index) => (
              <div 
                key={index}
                className="magazine-text-block"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            ))}
          </div>
          <div className="magazine-images">
            {imageBlocks.map((block, index) => (
              <div 
                key={index}
                className="magazine-image-block"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderModernLayout = () => {
    const textBlocks = contentBlocks.filter(b => b.type === 'text');
    const imageBlocks = contentBlocks.filter(b => b.type === 'image');
    
    return (
      <div className="preview-modern">
        <h1 className="preview-title">{title}</h1>
        
        {/* Featured Image */}
        {image && (
          <div className="modern-featured-image">
            <img src={image} alt="Ảnh đại diện" className="featured-img" />
          </div>
        )}
        
        {/* Meta Info */}
        {createdAt && (
          <div className="meta-info">
            Ngày tạo: {new Date(createdAt).toLocaleString()}
          </div>
        )}
        
        {/* First section: Image left, text right */}
        {imageBlocks[0] && (
          <div className="modern-section modern-image-left">
            <div 
              className="modern-image"
              dangerouslySetInnerHTML={{ __html: imageBlocks[0].content }}
            />
            <div className="modern-text">
              {textBlocks.slice(0, Math.ceil(textBlocks.length / 2)).map((block, index) => (
                <div 
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Second section: Text left, image right */}
        {imageBlocks[1] && (
          <div className="modern-section modern-image-right">
            <div className="modern-text">
              {textBlocks.slice(Math.ceil(textBlocks.length / 2)).map((block, index) => (
                <div 
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              ))}
            </div>
            <div 
              className="modern-image"
              dangerouslySetInnerHTML={{ __html: imageBlocks[1].content }}
            />
          </div>
        )}
        
        {/* Remaining images in classic style */}
        {imageBlocks.slice(2).map((block, index) => (
          <div key={index} className="modern-remaining">
            <div 
              className="modern-image-full"
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="preview-templates-container">
      {/* Preview Content - Render template được chọn */}
      <div className="preview-content">
        {template === 'classic' && renderClassicLayout()}
        {template === 'magazine' && renderMagazineLayout()}
        {template === 'modern' && renderModernLayout()}
      </div>
    </div>
  );
}