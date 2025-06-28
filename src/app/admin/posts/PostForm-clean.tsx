'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import './ckeditor-custom.css';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });

export default function PostForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const ClassicEditorRef = useRef<any>(null);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    import('@ckeditor/ckeditor5-build-decoupled-document').then((mod) => {
      if (mounted) {
        ClassicEditorRef.current = mod.default;
        setEditorReady(true);
        console.log('✅ CKEditor Decoupled build loaded');
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    
    const form = new FormData();
    form.append('file', file);
    
    try {
      const res = await axios.post('http://localhost:8080/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(res.data.url);
      console.log('✅ Featured image uploaded:', res.data.url);
    } catch (error) {
      console.error('❌ Featured image upload failed:', error);
      alert('Lỗi upload ảnh đại diện!');
      setImage('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/posts', {
        title,
        content,
        status,
        image
      });

      if (res.data) {
        alert('Tạo bài viết thành công!');
        setPreviewPost(res.data);
        setShowPreview(true);
        
        // Reset form
        setTitle('');
        setContent('');
        setStatus('draft');
        setImage('');
        setImageFile(null);
        setImagePreview(null);
        
        if (onCreated) onCreated();
      }
    } catch (error) {
      console.error('❌ Error creating post:', error);
      alert('Không thể tạo bài viết!');
    }
  };

  // Custom Upload Adapter cho CKEditor
  class MyUploadAdapter {
    private loader: any;

    constructor(loader: any) {
      this.loader = loader;
    }

    async upload() {
      return this.loader.file.then((file: File) => {
        return new Promise(async (resolve, reject) => {
          console.log('📤 CKEditor image upload started:', file.name);
          
          const formData = new FormData();
          formData.append('file', file);

          try {
            const response = await axios.post('http://localhost:8080/upload/ckeditor', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('✅ CKEditor upload successful:', response.data);
            resolve({ default: response.data.url });
          } catch (error) {
            console.error('❌ CKEditor upload failed:', error);
            reject(error);
          }
        });
      });
    }

    abort() {
      // Cleanup if needed
    }
  }

  function MyUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  }

  // Custom Edge Handles Plugin - 8 handles system
  function CustomEdgeHandlesPlugin(editor: any) {
    console.log('🎨 Custom Edge Handles Plugin initializing...');
    
    let isResizing = false;
    let resizeData: any = null;

    // Bắt đầu resize
    function startEdgeResize(e: MouseEvent, position: string, widget: HTMLElement) {
      const img = widget.querySelector('img') as HTMLElement;
      if (!img) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const startWidth = img.offsetWidth;
      const startHeight = img.offsetHeight;
      const aspectRatio = startWidth / startHeight;
      
      resizeData = {
        img,
        startX: e.clientX,
        startY: e.clientY,
        startWidth,
        startHeight,
        position,
        aspectRatio
      };
      
      isResizing = true;
      document.body.style.cursor = getCursor(position);
      document.body.style.userSelect = 'none';
      
      document.addEventListener('mousemove', handleEdgeResize);
      document.addEventListener('mouseup', stopEdgeResize);
      
      console.log(`🎯 Started ${position} resize from ${startWidth}x${startHeight}px`);
    }

    // Xử lý resize
    function handleEdgeResize(e: MouseEvent) {
      if (!isResizing || !resizeData) return;
      
      const { img, startX, startY, startWidth, startHeight, position, aspectRatio } = resizeData;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      const maintainAspectRatio = e.shiftKey;
      
      switch (position) {
        case 'left':
          newWidth = Math.max(50, startWidth - deltaX);
          if (maintainAspectRatio) newHeight = newWidth / aspectRatio;
          break;
        case 'right':
          newWidth = Math.max(50, startWidth + deltaX);
          if (maintainAspectRatio) newHeight = newWidth / aspectRatio;
          break;
        case 'top':
          newHeight = Math.max(50, startHeight - deltaY);
          if (maintainAspectRatio) newWidth = newHeight * aspectRatio;
          break;
        case 'bottom':
          newHeight = Math.max(50, startHeight + deltaY);
          if (maintainAspectRatio) newWidth = newHeight * aspectRatio;
          break;
      }

      // Apply new size
      img.style.width = newWidth + 'px';
      img.style.height = newHeight + 'px';
      img.style.transition = 'none';
      
      // Save to attributes
      img.setAttribute('width', newWidth.toString());
      img.setAttribute('height', newHeight.toString());
      img.setAttribute('data-original-width', newWidth.toString());
      img.setAttribute('data-original-height', newHeight.toString());
    }

    // Kết thúc resize
    function stopEdgeResize() {
      if (isResizing && resizeData) {
        const { img, position } = resizeData;
        console.log(`✅ ${position} resize completed: ${img.offsetWidth}x${img.offsetHeight}px`);
        
        img.style.transition = '';
        
        // Save to CKEditor model
        const finalWidth = img.offsetWidth;
        const finalHeight = img.offsetHeight;
        
        setTimeout(() => {
          editor.model.change((writer: any) => {
            const selection = editor.model.document.selection;
            const selectedElement = selection.getSelectedElement();
            if (selectedElement && (selectedElement.name === 'imageBlock' || selectedElement.name === 'imageInline')) {
              writer.setAttribute('width', finalWidth.toString(), selectedElement);
              writer.setAttribute('height', finalHeight.toString(), selectedElement);
            }
          });
          editor.fire('change:data');
        }, 100);
      }
      
      isResizing = false;
      resizeData = null;
      document.removeEventListener('mousemove', handleEdgeResize);
      document.removeEventListener('mouseup', stopEdgeResize);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    function getCursor(position: string): string {
      const cursors: { [key: string]: string } = {
        'left': 'w-resize', 'right': 'e-resize', 
        'top': 'n-resize', 'bottom': 's-resize'
      };
      return cursors[position] || 'default';
    }

    // Tạo custom handles trái/phải
    function createEdgeHandles(widget: HTMLElement) {
      // Xóa handles cũ
      widget.querySelectorAll('.ck-custom-edge-handle').forEach(h => h.remove());
      
      // Handle trái
      const leftHandle = document.createElement('div');
      leftHandle.className = 'ck-custom-edge-handle left';
      leftHandle.style.cssText = `
        position: absolute; left: -6px; top: 50%; transform: translateY(-50%);
        width: 12px; height: 24px; background: #ff6b6b; border: 2px solid #fff;
        border-radius: 6px; cursor: w-resize; z-index: 999999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3); pointer-events: auto;
        display: block !important; opacity: 1 !important;
      `;
      
      // Handle phải
      const rightHandle = document.createElement('div');
      rightHandle.className = 'ck-custom-edge-handle right';
      rightHandle.style.cssText = `
        position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
        width: 12px; height: 24px; background: #4ecdc4; border: 2px solid #fff;
        border-radius: 6px; cursor: e-resize; z-index: 999999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3); pointer-events: auto;
        display: block !important; opacity: 1 !important;
      `;
      
      // Event listeners
      leftHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startEdgeResize(e, 'left', widget);
      });
      
      rightHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startEdgeResize(e, 'right', widget);
      });
      
      // Hover effects
      [leftHandle, rightHandle].forEach(handle => {
        handle.addEventListener('mouseenter', () => {
          handle.style.transform = 'translateY(-50%) scale(1.2)';
          handle.style.transition = 'transform 0.2s ease';
        });
        handle.addEventListener('mouseleave', () => {
          handle.style.transform = 'translateY(-50%) scale(1)';
        });
      });
      
      widget.appendChild(leftHandle);
      widget.appendChild(rightHandle);
    }

    // Event listeners cho CSS pseudo-elements (top, bottom)
    function addPseudoElementListeners(widget: HTMLElement) {
      widget.addEventListener('mousedown', (e) => {
        const rect = widget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Top handle
        if (y <= 12 && x >= rect.width/2 - 12 && x <= rect.width/2 + 12) {
          startEdgeResize(e, 'top', widget);
          return;
        }
        
        // Bottom handle
        if (y >= rect.height - 12 && x >= rect.width/2 - 12 && x <= rect.width/2 + 12) {
          startEdgeResize(e, 'bottom', widget);
          return;
        }
      });
      
      widget.addEventListener('mousemove', (e) => {
        const rect = widget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (y <= 12 && x >= rect.width/2 - 12 && x <= rect.width/2 + 12) {
          widget.style.cursor = 'n-resize';
        } else if (y >= rect.height - 12 && x >= rect.width/2 - 12 && x <= rect.width/2 + 12) {
          widget.style.cursor = 's-resize';
        } else {
          widget.style.cursor = 'default';
        }
      });
    }

    // Setup handles cho image widgets
    function setupCustomHandles() {
      const imageWidgets = document.querySelectorAll('.ck-widget.image, .ck-widget.image-inline');
      console.log(`📸 Found ${imageWidgets.length} image widgets`);
      
      imageWidgets.forEach((widget: Element, index: number) => {
        const htmlWidget = widget as HTMLElement;
        htmlWidget.setAttribute('data-custom-handles', 'true');
        createEdgeHandles(htmlWidget);
        addPseudoElementListeners(htmlWidget);
        console.log(`✅ Setup handles for widget ${index + 1}`);
      });
    }

    // Monitor events
    editor.model.document.on('change:data', () => {
      setTimeout(() => setupCustomHandles(), 200);
    });

    editor.model.document.selection.on('change:range', () => {
      setTimeout(() => setupCustomHandles(), 100);
    });

    editor.on('ready', () => {
      console.log('🎯 Custom Edge Handles Plugin ready');
      setTimeout(() => setupCustomHandles(), 500);
      setTimeout(() => setupCustomHandles(), 2000);
    });
  }

  const config = {
    extraPlugins: [MyUploadAdapterPlugin, CustomEdgeHandlesPlugin],
    toolbar: {
      items: [
        'heading', '|',
        'bold', 'italic', 'underline', 'strikethrough', '|',
        'fontSize', 'fontColor', 'fontBackgroundColor', '|',
        'alignment', '|',
        'numberedList', 'bulletedList', '|',
        'outdent', 'indent', '|',
        'link', 'blockQuote', 'insertTable', '|',
        'imageUpload', 'mediaEmbed', '|',
        'undo', 'redo', '|',
        'sourceEditing'
      ]
    },
    image: {
      resizeUnit: 'px',
      resizeOptions: [
        { name: 'resizeImage:original', value: null, label: 'Original' },
        { name: 'resizeImage:25', value: '25', label: '25%' },
        { name: 'resizeImage:50', value: '50', label: '50%' },
        { name: 'resizeImage:75', value: '75', label: '75%' }
      ],
      toolbar: [
        'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
        'toggleImageCaption', 'imageTextAlternative', '|',
        'linkImage', '|',
        'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
      ],
      styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    link: {
      decorators: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://'
      }
    },
    placeholder: 'Nhập nội dung bài viết...',
    fontSize: {
      options: ['tiny', 'small', 'default', 'big', 'huge']
    },
    fontColor: {
      colors: [
        { color: 'hsl(0, 0%, 0%)', label: 'Black' },
        { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
        { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
        { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
        { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ]
    },
    fontBackgroundColor: {
      colors: [
        { color: 'hsl(0, 75%, 60%)', label: 'Red' },
        { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
        { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
        { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
        { color: 'hsl(120, 75%, 60%)', label: 'Green' },
        { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
        { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
        { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
        { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
        { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
      ]
    },
    alignment: {
      options: ['left', 'center', 'right', 'justify']
    },
    heading: {
      options: ['paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6']
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tạo Bài Viết Mới</h2>
        
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Hướng dẫn sử dụng CKEditor với 8 Handles:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Upload ảnh:</strong> Kéo thả hoặc click icon ảnh trên toolbar</li>
            <li>• <strong>Resize ảnh (8 handles):</strong></li>
            <li className="ml-4">- 4 góc (xanh dương): Resize giữ tỷ lệ</li>
            <li className="ml-4">- 2 cạnh trái/phải (đỏ/xanh): Resize width</li>
            <li className="ml-4">- 2 cạnh trên/dưới (xanh lá): Resize height</li>
            <li>• <strong>Giữ tỷ lệ:</strong> Nhấn giữ Shift khi kéo handle</li>
            <li>• <strong>Căn chỉnh:</strong> Chọn ảnh → Dùng nút alignment</li>
            <li>• <strong>Right-click:</strong> Chuột phải ảnh → Properties để nhập px</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề bài viết *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tiêu đề bài viết..."
              required
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh đại diện
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {uploading && <p className="text-blue-500 mt-2">Đang upload...</p>}
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung bài viết *
            </label>
            
            {/* Toolbar Container */}
            <div ref={toolbarRef} className="ck-toolbar-container border border-gray-300 rounded-t-lg"></div>
            
            {/* Editor Container */}
            <div className="ck-editor-container">
              {editorReady && ClassicEditorRef.current && (
                <CKEditor
                  editor={ClassicEditorRef.current}
                  data={content}
                  config={config as any}
                  onReady={(editor) => {
                    console.log('✅ CKEditor ready with custom handles!');
                    
                    // Decoupled editor: Di chuyển toolbar
                    const toolbar = editor.ui.view.toolbar?.element;
                    if (toolbarRef.current && toolbar) {
                      toolbarRef.current.appendChild(toolbar);
                    }
                    
                    setEditorInstance(editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                  onError={(error, { willEditorRestart }) => {
                    if (willEditorRestart) {
                      console.log('Editor will restart');
                    }
                    console.error('CKEditor error:', error);
                  }}
                />
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đã xuất bản</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => {
                if (!title.trim() || !content.trim()) {
                  alert('Vui lòng nhập đầy đủ thông tin để xem trước!');
                  return;
                }
                setPreviewPost({ title, content, image, status, created_at: new Date().toISOString() });
                setShowPreview(true);
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Xem trước
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Tạo bài viết
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && previewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Xem trước bài viết</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <article className="prose max-w-none">
                <h1>{previewPost.title}</h1>
                {previewPost.image && (
                  <img 
                    src={previewPost.image} 
                    alt={previewPost.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <div 
                  dangerouslySetInnerHTML={{ __html: previewPost.content }}
                  className="prose-content"
                />
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
