'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
  const [editorInstance, setEditorInstance] = useState<any>(null);

  // Load CKEditor
  useEffect(() => {
    let mounted = true;
    
    import('@ckeditor/ckeditor5-build-decoupled-document').then((mod) => {
      if (mounted) {
        ClassicEditorRef.current = mod.default;
        setEditorReady(true);
      }
    }).catch((error) => {
      console.error('Failed to load CKEditor:', error);
    });
    
    return () => { mounted = false; };
  }, []);

  // Upload adapter
  class MyUploadAdapter {
    private loader: any;
    private xhr: XMLHttpRequest | null = null;

    constructor(loader: any) {
      this.loader = loader;
    }

    upload(): Promise<{ default: string }> {
      return this.loader.file
        .then((file: File) => new Promise<{ default: string }>((resolve, reject) => {
          const xhr = this.xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:8080/upload/ckeditor', true);
          xhr.responseType = 'json';

          xhr.addEventListener('error', () => reject(`Upload failed: ${file.name}`));
          xhr.addEventListener('abort', () => reject());
          xhr.addEventListener('load', () => {
            const response = xhr.response;
            if (!response || response.error) {
              return reject(response?.error?.message || 'Upload failed');
            }
            resolve({ default: response.url });
          });

          const data = new FormData();
          data.append('upload', file);
          xhr.send(data);
        }));
    }

    abort(): void {
      if (this.xhr) this.xhr.abort();
    }
  }

  function MyCustomUploadAdapterPlugin(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader);
    };
  }

  // SIMPLE Image Drag & Resize Plugin
  function SimpleImagePlugin(editor: any): void {
    let isDragging = false;
    let isResizing = false;
    let dragData: any = null;
    let resizeData: any = null;

    // Simple drag function
    function startDrag(e: MouseEvent, img: HTMLElement) {
      e.preventDefault();
      isDragging = true;
      dragData = {
        startX: e.clientX,
        startY: e.clientY,
        img,
        startLeft: parseInt(img.style.left || '0'),
        startTop: parseInt(img.style.top || '0')
      };
      
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
      document.body.style.cursor = 'move';
    }

    function handleDrag(e: MouseEvent) {
      if (!isDragging || !dragData) return;
      
      const { startX, startY, img, startLeft, startTop } = dragData;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      img.style.position = 'relative';
      img.style.left = (startLeft + deltaX) + 'px';
      img.style.top = (startTop + deltaY) + 'px';
    }

    function stopDrag() {
      isDragging = false;
      dragData = null;
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.body.style.cursor = 'default';
    }

    // Simple resize function
    function startResize(e: MouseEvent, img: HTMLElement) {
      e.preventDefault();
      isResizing = true;
      resizeData = {
        startX: e.clientX,
        startY: e.clientY,
        img,
        startWidth: img.offsetWidth,
        startHeight: img.offsetHeight
      };
      
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
      document.body.style.cursor = 'se-resize';
    }

    function handleResize(e: MouseEvent) {
      if (!isResizing || !resizeData) return;
      
      const { startX, startY, img, startWidth, startHeight } = resizeData;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newWidth = Math.max(50, startWidth + deltaX);
      const newHeight = Math.max(50, startHeight + deltaY);
      
      img.style.width = newWidth + 'px';
      img.style.height = newHeight + 'px';
    }

    function stopResize() {
      isResizing = false;
      resizeData = null;
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
      document.body.style.cursor = 'default';
    }

    // Add simple controls to images
    function addSimpleControls() {
      const images = document.querySelectorAll('.ck-content img');
      
      images.forEach((img) => {
        const htmlImg = img as HTMLElement;
        
        // Remove existing controls
        const existingControls = htmlImg.parentElement?.querySelector('.simple-controls');
        if (existingControls) existingControls.remove();
        
        // Create simple control overlay
        const controls = document.createElement('div');
        controls.className = 'simple-controls';
        controls.style.cssText = `
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px dashed #007cff;
          pointer-events: none;
          display: none;
        `;
        
        // Drag handle
        const dragHandle = document.createElement('div');
        dragHandle.style.cssText = `
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 20px;
          background: #007cff;
          color: white;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: move;
          pointer-events: auto;
          border-radius: 3px;
        `;
        dragHandle.innerHTML = '⋮⋮';
        dragHandle.addEventListener('mousedown', (e) => startDrag(e, htmlImg));
        
        // Resize handle
        const resizeHandle = document.createElement('div');
        resizeHandle.style.cssText = `
          position: absolute;
          bottom: -5px;
          right: -5px;
          width: 15px;
          height: 15px;
          background: #007cff;
          cursor: se-resize;
          pointer-events: auto;
          border-radius: 2px;
        `;
        resizeHandle.addEventListener('mousedown', (e) => startResize(e, htmlImg));
        
        controls.appendChild(dragHandle);
        controls.appendChild(resizeHandle);
        
        // Show/hide controls on hover
        htmlImg.addEventListener('mouseenter', () => {
          controls.style.display = 'block';
        });
        htmlImg.addEventListener('mouseleave', () => {
          if (!isDragging && !isResizing) {
            controls.style.display = 'none';
          }
        });
        
        // Position controls relative to image
        htmlImg.style.position = 'relative';
        htmlImg.parentElement?.appendChild(controls);
      });
    }

    // Setup on editor ready
    editor.on('ready', () => {
      setTimeout(addSimpleControls, 500);
      
      // Re-add controls when content changes
      editor.model.document.on('change:data', () => {
        setTimeout(addSimpleControls, 100);
      });
    });
  }

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
    } catch (err) {
      alert('Lỗi upload ảnh!');
      setImage('');
    }
    
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('http://localhost:8080/posts', {
        title,
        content,
        author_id: 1,
        status,
        image,
      });
      
      setTitle('');
      setContent('');
      setStatus('draft');
      setImage('');
      setImageFile(null);
      setImagePreview(null);
      onCreated && onCreated();
      
      alert('Bài viết đã được tạo thành công!');
    } catch (error) {
      alert('Không thể kết nối tới API!');
      console.error(error);
    }
  };

  const initEditor = async () => {
    if (!ClassicEditorRef.current) return;

    try {
      const editor = await ClassicEditorRef.current.create(
        document.querySelector('#editor'),
        {
          extraPlugins: [MyCustomUploadAdapterPlugin, SimpleImagePlugin],
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'underline', '|',
            'link', 'insertTable', '|',
            'imageUpload', '|',
            'bulletedList', 'numberedList', '|',
            'outdent', 'indent', '|',
            'undo', 'redo'
          ],
          image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side'],
            upload: {
              types: ['jpeg', 'png', 'gif', 'bmp', 'webp']
            }
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          }
        }
      );

      // Toolbar setup
      const toolbarElement = document.querySelector('#toolbar');
      if (toolbarElement) {
        toolbarElement.appendChild(editor.ui.view.toolbar.element);
      }

      editor.model.document.on('change:data', () => {
        setContent(editor.getData());
      });

      setEditorInstance(editor);
    } catch (error) {
      console.error('Error creating editor:', error);
    }
  };

  useEffect(() => {
    if (editorReady) {
      initEditor();
    }

    return () => {
      if (editorInstance && typeof editorInstance.destroy === 'function') {
        editorInstance.destroy().catch(console.error);
      }
    };
  }, [editorReady]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tạo bài viết mới</h2>
      
      {/* Instructions */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Hướng dẫn sử dụng:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload ảnh vào editor, hover chuột lên ảnh để thấy controls</li>
          <li>• Kéo ⋮⋮ (màu xanh) để di chuyển ảnh</li>
          <li>• Kéo ô vuông (góc dưới phải) để resize ảnh</li>
          <li>• Đơn giản và dễ sử dụng như Word</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh bìa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung
          </label>
          {editorReady && (
            <>
              <div id="toolbar" className="border border-gray-300 rounded-t-md"></div>
              <div
                id="editor"
                className="min-h-[400px] border border-gray-300 border-t-0 rounded-b-md p-4"
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã xuất bản</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Đang tải...' : 'Tạo bài viết'}
        </button>
      </form>
    </div>
  );
}
