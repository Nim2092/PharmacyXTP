'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import './ckeditor-custom.css';
import TemplateSelect from '@/components/NewsTemplates/TemplateSelect';
import NewsTemplateRenderer from '@/components/NewsTemplates/NewsTemplateRenderer';
import { TemplateType } from '@/components/NewsTemplates/NewsTemplateRenderer';
// Sử dụng dynamic import để tránh lỗi SSR
const loadCKEditorModules = async () => {
  const { 
    editorConfig, 
    MyCustomUploadAdapterPlugin, 
    setupGlobalDebugFunctions,
    loadCustomHandles 
  } = await import('./ckeditor');
  return { editorConfig, MyCustomUploadAdapterPlugin, setupGlobalDebugFunctions, loadCustomHandles };
};

export default function PostForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [image, setImage] = useState(''); // Link ảnh
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // Thêm state cho template
  const [template, setTemplate] = useState<TemplateType>('template1');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  
  const ClassicEditorRef = useRef<any>(null);
  const [previewPost, setPreviewPost] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'magazine' | 'modern'>('classic');
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [dynamicConfig, setDynamicConfig] = useState<any>(null);
  const [CKEditorModules, setCKEditorModules] = useState<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

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
    setIsClient(true);
  }, []);

  // Load CKEditor modules và tạo config
  useEffect(() => {
    if (isClient && editorReady && !dynamicConfig) {
      loadCKEditorModules().then(modules => {
        const { editorConfig, MyCustomUploadAdapterPlugin, loadCustomHandles } = modules;
        
        // Tạo config với plugins - sử dụng approach đơn giản hơn
        const config = {
          ...editorConfig,
          extraPlugins: [
            MyCustomUploadAdapterPlugin
            // Custom handles sẽ được add sau khi editor ready
          ]
        };
        setDynamicConfig(config);
        console.log('✅ Dynamic config created with modules');
      }).catch(error => {
        console.error('❌ Failed to load CKEditor modules:', error);
      });
    }
  }, [isClient, editorReady, dynamicConfig]);

  // Initialize CKEditor directly without React wrapper
  useEffect(() => {
    if (isClient && editorReady && ClassicEditorRef.current && dynamicConfig && editorContainerRef.current && !editorInstance) {
      const initEditor = async () => {
        try {
          const editor = await ClassicEditorRef.current.create(editorContainerRef.current, dynamicConfig);
          
          console.log('🎉 CKEditor is ready!', editor);
          setEditorInstance(editor);
          
          // Setup global debug functions dynamically
          loadCKEditorModules().then(modules => {
            modules.setupGlobalDebugFunctions();
          }).catch(error => {
            console.warn('⚠️ Failed to setup debug functions:', error);
          });
          
          // Listen for content changes
          editor.model.document.on('change:data', () => {
            setContent(editor.getData());
          });
          
          // Set initial content if any
          if (content) {
            editor.setData(content);
          }
          
          // Plugins đã được load tự động qua extraPlugins
          const loadedPlugins = Array.from(editor.plugins).map((p: any) => p.constructor.name);
          console.log('📦 Plugins loaded:', loadedPlugins);
            // Check upload functionality
          const hasFileRepository = loadedPlugins.includes('FileRepository');
          const hasImageUpload = loadedPlugins.includes('ImageUpload');
          console.log('🔍 Upload capabilities:', { hasFileRepository, hasImageUpload });
          
          // Gắn toolbar cho decoupled editor
          if (toolbarRef.current && editor.ui?.view?.toolbar?.element) {
            toolbarRef.current.innerHTML = '';
            toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
            console.log('🔧 Toolbar attached for decoupled editor');
          }

          // Load custom handles function sau khi editor ready
          loadCKEditorModules().then(modules => {
            modules.loadCustomHandles().then((initializeCustomHandles: any) => {
              try {
                initializeCustomHandles(editor);
                console.log('✅ Custom handles initialized after editor ready');
              } catch (error) {
                console.warn('⚠️ Custom handles failed to initialize:', error);
              }
            }).catch((error: any) => {
              console.warn('⚠️ Failed to load custom handles:', error);
            });
          }).catch(error => {
            console.warn('⚠️ Failed to load CKEditor modules for custom handles:', error);
          });

          console.log('✅ CKEditor setup complete. Available debug commands:');
          console.log('  - debugCKEditor(editor): Debug editor state');
          console.log('  - testCKEditorUpload(editor): Test upload functionality');
          console.log('  - testUploadEndpoints(): Test all upload endpoints');
          
        } catch (error) {
          console.error('❌ Failed to initialize CKEditor:', error);
        }
      };
      
      initEditor();
    }
  }, [isClient, editorReady, ClassicEditorRef.current, dynamicConfig, editorInstance]);

  useEffect(() => {
    if (!isClient) return;
    let mounted = true;
    
    // Load decoupled document editor
    import('@ckeditor/ckeditor5-build-decoupled-document').then((mod) => {
      if (mounted) {
        ClassicEditorRef.current = mod.default;
        setEditorReady(true);
        console.log('CKEditor decoupled document loaded successfully');
      }
    }).catch((error) => {
      console.error('Failed to load CKEditor:', error);
    });
    
    return () => { mounted = false; };
  }, [isClient]);

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
        template, // Thêm template
        author, // Thêm author
        category, // Thêm category
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
      setTemplate('template1');
      setAuthor('');
      setCategory('');
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
          <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
            <button 
              className="absolute top-4 right-4 z-50 text-gray-500 hover:text-red-600 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md" 
              onClick={() => {
                setShowPreview(false);
                // Không cần reset template vì nó đã được chọn từ form
              }}
            >
              &times;
            </button>
            
            {/* Template Selection Header */}
            <div className="p-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Xem trước bài viết</h2>
              <p className="text-gray-600">Template: <span className="font-medium capitalize">{template}</span></p>
            </div>

            {/* Preview Content */}
            <div className="p-6">
              <NewsTemplateRenderer 
                post={{
                  id: previewPost.id,
                  title: previewPost.title,
                  content: previewPost.content,
                  created_at: previewPost.created_at,
                  author: previewPost.author || author,
                  category: previewPost.category || category,
                  image: previewPost.image,
                  template: template // Sử dụng template từ form
                }}
              />
            </div>
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

        {/* Author và Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Tác giả</label>
            <input 
              className="border p-2 w-full text-black rounded" 
              placeholder="Nhập tên tác giả..." 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Danh mục</label>
            <select 
              className="border p-2 w-full text-black rounded bg-white" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Chọn danh mục</option>
              <option value="Tin tức">Tin tức</option>
              <option value="Thông báo">Thông báo</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-4">
          <TemplateSelect 
            selectedTemplate={template}
            onTemplateChange={setTemplate}
            showPreview={true}
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
              <strong>✨ Modular CKEditor System - Decoupled Document + 9 Handles:</strong> 
              <br />• <span className="text-purple-600">Decoupled Document Editor</span>: Toolbar riêng biệt, flexible UI
              <br />• <span className="text-blue-600">Upload Adapter</span>: Multi-endpoint upload với fallback
              <br />• <span className="text-green-600">Custom Handles Plugin</span>: 9 handles system (standalone function)
              <br />• <span className="text-orange-600">Drag & Drop + Resize</span>: Đầy đủ tính năng resize theo handler
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
          {isClient && editorReady && ClassicEditorRef.current && dynamicConfig && (
            <div className="border border-gray-300 rounded bg-white">
              {/* Toolbar riêng biệt cho decoupled editor */}
              <div ref={toolbarRef} className="border-b border-gray-300 bg-gray-50 p-2"></div>
              
              {/* Editor content */}
              <div className="p-4">
                <div ref={editorContainerRef} className="min-h-[300px]">
                  {/* CKEditor sẽ được khởi tạo trực tiếp vào div này */}
                </div>
              </div>
            </div>
          )}
          {(!isClient || !editorReady) && <textarea className="border p-2 mb-2 w-full text-black" placeholder="Nội dung" value={content} onChange={e => setContent(e.target.value)} required />}
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Ảnh đại diện bài viết</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploading && <div className="text-blue-600">Đang upload...</div>}
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Trạng thái</label>
          <select 
            className="border p-2 w-full text-black rounded bg-white" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã xuất bản</option>
            <option value="archived">Lưu trữ</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Tạo bài viết
        </button>
      </form>
    </>
  );
}