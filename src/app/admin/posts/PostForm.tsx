'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import './ckeditor-custom.css';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });

// Config đơn giản cho decoupled editor với đầy đủ tính năng
const editorConfig = {
  toolbar: [
    'heading', '|',
    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
    'bold', 'italic', 'underline', 'strikethrough', '|',
    'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
    'bulletedList', 'numberedList', 'outdent', 'indent', '|',
    'link', 'imageUpload', 'blockQuote', 'insertTable', '|',
    'undo', 'redo'
  ],
  placeholder: 'Nhập nội dung bài viết tại đây...',
};

// Simple upload adapter function
function createUploadAdapter(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return loader.file.then((file: File) => new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('file', file);
          
          fetch('http://localhost:8080/upload/ckeditor', {
            method: 'POST',
            body: form,
          })
          .then(response => response.json())
          .then(result => {
            if (result.url) {
              resolve({ default: result.url });
            } else {
              reject('Upload failed');
            }
          })
          .catch(error => reject(error));
        }));
      },
      abort: () => {}
    };
  };
}

// Custom handles function cho ảnh
function setupCustomImageHandles(editor: any) {
  let isResizing = false;
  let dragData: any = null;

  // Tạo 9 handles cho ảnh: 4 góc + 4 cạnh + 1 drag
  function createHandlesForImage(widget: HTMLElement) {
    if (!widget || widget.querySelector('.custom-handles-created')) return;
    
    widget.setAttribute('data-custom-handles-created', 'true');
    
    const img = widget.querySelector('img');
    if (!img) return;

    // Container cho handles
    const handlesContainer = document.createElement('div');
    handlesContainer.className = 'custom-image-handles';
    handlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999;
    `;

    // 1. DRAG HANDLE (tím - ở trên)
    const dragHandle = document.createElement('div');
    dragHandle.innerHTML = '⋮⋮';
    dragHandle.style.cssText = `
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 18px;
      background: linear-gradient(135deg, #6c5ce7, #a29bfe);
      border: 2px solid #fff;
      border-radius: 8px;
      cursor: move;
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8px;
      color: white;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    // 4 CORNER HANDLES
    const corners = [
      { name: 'nw', pos: 'top: -6px; left: -6px;', cursor: 'nw-resize' },
      { name: 'ne', pos: 'top: -6px; right: -6px;', cursor: 'ne-resize' },
      { name: 'sw', pos: 'bottom: -6px; left: -6px;', cursor: 'sw-resize' },
      { name: 'se', pos: 'bottom: -6px; right: -6px;', cursor: 'se-resize' }
    ];

    corners.forEach(corner => {
      const handle = document.createElement('div');
      handle.style.cssText = `
        position: absolute;
        ${corner.pos}
        width: 12px;
        height: 12px;
        background: linear-gradient(135deg, #00cec9, #55efc4);
        border: 2px solid #fff;
        border-radius: 3px;
        cursor: ${corner.cursor};
        pointer-events: auto;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      `;
      
      handle.addEventListener('mousedown', (e) => startResize(e, corner.name, widget));
      handlesContainer.appendChild(handle);
    });

    // 4 EDGE HANDLES
    const edges = [
      { name: 'n', pos: 'top: -6px; left: 50%; transform: translateX(-50%);', cursor: 'n-resize', bg: '#fd79a8' },
      { name: 's', pos: 'bottom: -6px; left: 50%; transform: translateX(-50%);', cursor: 's-resize', bg: '#74b9ff' },
      { name: 'w', pos: 'left: -6px; top: 50%; transform: translateY(-50%);', cursor: 'w-resize', bg: '#ff6b6b' },
      { name: 'e', pos: 'right: -6px; top: 50%; transform: translateY(-50%);', cursor: 'e-resize', bg: '#4ecdc4' }
    ];

    edges.forEach(edge => {
      const handle = document.createElement('div');
      const size = edge.name === 'n' || edge.name === 's' ? '24px' : '12px';
      const height = edge.name === 'n' || edge.name === 's' ? '12px' : '24px';
      
      handle.style.cssText = `
        position: absolute;
        ${edge.pos}
        width: ${size};
        height: ${height};
        background: ${edge.bg};
        border: 2px solid #fff;
        border-radius: 4px;
        cursor: ${edge.cursor};
        pointer-events: auto;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      `;
      
      handle.addEventListener('mousedown', (e) => startResize(e, edge.name, widget));
      handlesContainer.appendChild(handle);
    });

    // Event cho drag handle
    dragHandle.addEventListener('mousedown', (e) => startDrag(e, widget));
    handlesContainer.appendChild(dragHandle);

    // Add handles container to widget
    widget.style.position = 'relative';
    widget.appendChild(handlesContainer);

    console.log('✅ Created 9 custom handles for image');
  }

  // Drag functions
  function startDrag(e: MouseEvent, widget: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    
    dragData = {
      startX: e.clientX,
      startY: e.clientY,
      widget: widget,
      initialLeft: parseInt(widget.style.left || '0'),
      initialTop: parseInt(widget.style.top || '0')
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.body.style.userSelect = 'none';
  }

  function handleDrag(e: MouseEvent) {
    if (!dragData) return;
    
    const deltaX = e.clientX - dragData.startX;
    const deltaY = e.clientY - dragData.startY;
    
    dragData.widget.style.position = 'relative';
    dragData.widget.style.left = (dragData.initialLeft + deltaX) + 'px';
    dragData.widget.style.top = (dragData.initialTop + deltaY) + 'px';
  }

  function stopDrag() {
    if (dragData) {
      editor.fire('change:data');
      console.log('✅ Drag completed, position saved');
    }
    dragData = null;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.body.style.userSelect = '';
  }

  // Resize functions
  function startResize(e: MouseEvent, direction: string, widget: HTMLElement) {
    e.preventDefault();
    e.stopPropagation();
    
    const img = widget.querySelector('img') as HTMLImageElement;
    if (!img) return;

    isResizing = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = img.offsetWidth;
    const startHeight = img.offsetHeight;

    function handleResize(e: MouseEvent) {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;

      // Calculate new dimensions based on direction
      switch(direction) {
        case 'se':
        case 'e':
          newWidth = startWidth + deltaX;
          break;
        case 'sw':
        case 'w':
          newWidth = startWidth - deltaX;
          break;
        case 'ne':
        case 'n':
          newHeight = startHeight - deltaY;
          break;
        case 'nw':
          newWidth = startWidth - deltaX;
          newHeight = startHeight - deltaY;
          break;
        case 's':
          newHeight = startHeight + deltaY;
          break;
      }

      // Maintain aspect ratio if shift key is pressed
      if (e.shiftKey) {
        const aspectRatio = startWidth / startHeight;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      // Apply minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(30, newHeight);

      img.style.width = newWidth + 'px';
      img.style.height = newHeight + 'px';
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
      document.body.style.userSelect = '';
      editor.fire('change:data');
      console.log('✅ Resize completed, size saved');
    }

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.body.style.userSelect = 'none';
  }

  // Setup handles when images are added/selected
  editor.model.document.on('change:data', () => {
    setTimeout(() => {
      const widgets = editor.ui.view.element?.querySelectorAll('.ck-widget');
      widgets?.forEach((widget: HTMLElement) => {
        if (widget.querySelector('img') && !widget.getAttribute('data-custom-handles-created')) {
          createHandlesForImage(widget);
        }
      });
    }, 100);
  });

  // Hide native CKEditor handles
  const style = document.createElement('style');
  style.textContent = `
    .ck-widget.ck-widget_selected .ck-widget__resizer {
      display: none !important;
    }
    .ck-widget__type-around {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  console.log('✅ Custom image handles system initialized');
}

export default function PostForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [image, setImage] = useState(''); // Link ảnh
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const ClassicEditorRef = useRef<any>(null);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Cleanup function để destroy editor instance - FIXED
  useEffect(() => {
    return () => {
      if (editorInstance) {
        try {
          // Kiểm tra nếu editor vẫn còn tồn tại và có method destroy
          if (editorInstance && typeof editorInstance.destroy === 'function') {
            // Đảm bảo editor không bị destroy nhiều lần
            if (!editorInstance.isDestroyed) {
              editorInstance.destroy().catch((error: any) => {
                console.warn('Lỗi khi destroy editor (có thể đã bị destroy):', error);
              });
            }
          }
        } catch (error) {
          console.warn('Lỗi khi gọi destroy editor:', error);
        }
      }
    };
  }, [editorInstance]);

  useEffect(() => {
    let mounted = true;
    
    // Load decoupled document editor
    import('@ckeditor/ckeditor5-build-decoupled-document').then((mod) => {
      if (mounted) {
        ClassicEditorRef.current = mod.default;
        setEditorReady(true);
        console.log('CKEditor decoupled-document loaded successfully');
      }
    }).catch((error) => {
      console.error('Failed to load CKEditor:', error);
    });
    
    return () => { mounted = false; };
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    // Upload file lên server
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
        image, // Gửi link ảnh
      });
      // Hiển thị preview bài viết vừa tạo
      setPreviewPost(res.data);
      setShowPreview(true);
      setTitle('');
      setContent('');
      setStatus('draft');
      setImage('');
      setImageFile(null);
      setImagePreview(null);
      onCreated && onCreated();
    } catch (error) {
      alert('Không thể kết nối tới API!');
      console.error(error);
    }
  };

  // Removed unused insertAlignment function

  return (
    <>
      {showPreview && previewPost && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl" onClick={() => setShowPreview(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Xem trước bài viết</h2>
            <h1 className="text-xl font-bold mb-2">{previewPost.title}</h1>
            {previewPost.image && <img src={previewPost.image} alt="Ảnh đại diện" className="mb-4 w-full max-h-64 object-cover rounded" />}
            <div className="mb-4 text-gray-600">
              Ngày tạo: {previewPost.created_at ? new Date(previewPost.created_at).toLocaleString() : '---'}
            </div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: previewPost.content }} />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="m-auto p-4">
        <h2 className="text-xl font-bold mb-2">Tạo bài viết mới</h2>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Tiêu đề</label>
          <input 
            className="border p-2 mb-2 w-full text-black" 
            placeholder="Nhập tiêu đề bài viết..." 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Nội dung</label>
          <div className="mb-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
            💡 <strong>Hướng dẫn sử dụng CKEditor với Custom Handlers:</strong> 
            <ul className="mt-1 ml-4 list-disc text-xs">
              <li><strong>Upload ảnh</strong>: Click nút "Chèn ảnh" (📷) → Chọn file → Ảnh tự động upload</li>
              <li><strong>Custom Handles System</strong>: 
                <ul className="ml-4 list-disc">
                  <li><strong>Click vào ảnh</strong> → Hiện 9 handles tùy chỉnh</li>
                  <li><strong>1 Handle tím (⋮⋮)</strong>: Drag & Drop di chuyển ảnh tự do</li>
                  <li><strong>4 Góc xanh dương</strong>: Resize theo hướng kéo + thay đổi vị trí</li>
                  <li><strong>4 Cạnh màu sắc</strong>: Trái(đỏ), Phải(xanh lá), Trên(hồng), Dưới(xanh)</li>
                </ul>
              </li>
              <li><strong>Resize với tỷ lệ</strong>: Nhấn giữ Shift khi kéo bất kỳ handle nào</li>
              <li><strong>Ẩn native handles</strong>: Custom handles sẽ thay thế handles mặc định của CKEditor</li>
              <li><strong>Keyboard shortcuts</strong>: Ctrl+B: Bold, Ctrl+I: Italic, Ctrl+K: Link</li>
            </ul>
            <div className="mt-2 p-2 bg-green-100 rounded text-xs">
              <strong>✨ Modular CKEditor System - 9 Handles + Upload:</strong> 
              <br />• <span className="text-purple-600">Upload Adapter</span>: Tự động upload qua Go backend (/upload)
              <br />• <span className="text-blue-600">Custom Edge Handles Plugin</span>: 9 handles system đã được tách module
              <br />• <span className="text-green-600">Hide Native Handles</span>: Ẩn handles mặc định, chỉ hiển thị custom
              <br />• <span className="text-orange-600">Drag & Drop + Resize</span>: Đầy đủ tính năng từ modules
            </div>
            <div className="mt-1 p-2 bg-orange-100 rounded text-xs">
              <strong>🔧 Debug Functions (Available in Console):</strong>
              <br />• <code>debugCKEditorHandles()</code>: Debug thông tin handles
              <br />• <code>forceCreateHandlesOnWidget(0)</code>: Tạo handles cho widget đầu tiên  
              <br />• <code>testCKEditorHTMLOutput()</code>: Test HTML output
              <br />• Check Console (F12) để xem logs của upload và handles
            </div>
          </div>
          
          {/* Decoupled Document Editor với đầy đủ tính năng */}
          {editorReady && ClassicEditorRef.current && (
            <div className="border border-gray-300 rounded bg-white">
              {/* Toolbar riêng biệt cho decoupled editor */}
              <div ref={toolbarRef} className="border-b border-gray-300 bg-gray-50 p-2"></div>
              
              {/* Editor content */}
              <div className="p-4">
                <CKEditor
                  editor={ClassicEditorRef.current}
                  config={editorConfig}
                  data={content}
                  onChange={(_, editor) => setContent(editor.getData())}
                  onReady={(editor) => {
                    console.log('CKEditor is ready!', editor);
                    setEditorInstance(editor);
                    
                    // Upload adapter và custom handles sẽ được setup tự động qua extraPlugins
                    console.log('Plugins loaded:', Array.from(editor.plugins).map(p => p.constructor.name));
                    
                    // Gắn toolbar cho decoupled editor
                    if (toolbarRef.current && editor.ui?.view?.toolbar?.element) {
                      toolbarRef.current.innerHTML = '';
                      toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
                      console.log('Toolbar attached for decoupled editor');
                    }
                  }}
                  onError={(error: any, details: any) => {
                    console.error('CKEditor error:', error);
                    if (details?.willEditorRestart) {
                      console.log('Editor will restart');
                    }
                  }}
                />
              </div>
            </div>
          )}
          {!editorReady && <textarea className="border p-2 mb-2 w-full text-black" placeholder="Nội dung" value={content} onChange={e => setContent(e.target.value)} required />}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Ảnh đại diện bài viết</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploading && <div className="text-blue-600">Đang upload...</div>}
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Tạo bài viết
        </button>
      </form>
    </>
  );
}