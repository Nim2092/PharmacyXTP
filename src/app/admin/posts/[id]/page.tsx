"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import TemplateSelect from '@/components/NewsTemplates/TemplateSelect';
import NewsTemplateRenderer from '@/components/NewsTemplates/NewsTemplateRenderer';
import { TemplateType } from '@/components/NewsTemplates/NewsTemplateRenderer';

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editTemplate, setEditTemplate] = useState<TemplateType>('template1');
  const [editAuthor, setEditAuthor] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState("draft");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const ClassicEditorRef = useRef<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load CKEditor build
  useEffect(() => {
    if (!isClient) return;
    let mounted = true;
    
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

  // Initialize CKEditor when editing
  useEffect(() => {
    if (isClient && editorReady && isEditing && ClassicEditorRef.current && editorContainerRef.current && !editorInstance) {
      const initEditor = async () => {
        try {
          const editor = await ClassicEditorRef.current.create(editorContainerRef.current, {
            placeholder: 'Nhập nội dung bài viết...'
          });
          
          console.log('🎉 CKEditor is ready for editing!', editor);
          setEditorInstance(editor);
          
          // Gắn toolbar cho decoupled editor
          if (toolbarRef.current && editor.ui?.view?.toolbar?.element) {
            toolbarRef.current.innerHTML = '';
            toolbarRef.current.appendChild(editor.ui.view.toolbar.element);
            console.log('🔧 Toolbar attached for decoupled editor');
          }
          
          // Set initial content
          if (editContent) {
            editor.setData(editContent);
          }
          
          // Listen for content changes
          editor.model.document.on('change:data', () => {
            setEditContent(editor.getData());
          });
          
        } catch (error) {
          console.error('❌ Failed to initialize CKEditor:', error);
        }
      };
      
      initEditor();
    }
  }, [isClient, editorReady, isEditing, editContent, editorInstance]);

  // Cleanup editor when not editing
  useEffect(() => {
    if (!isEditing && editorInstance) {
      editorInstance.destroy().catch((error: any) => {
        console.warn('Failed to destroy editor:', error);
      });
      setEditorInstance(null);
    }
  }, [isEditing, editorInstance]);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:8080/posts/${id}`)
      .then((res: any) => {
        setPost(res.data);
        setEditTitle(res.data.title);
        setEditContent(res.data.content);
        setEditImage(res.data.image || null);
        setEditTemplate(res.data.template || 'template1');
        setEditAuthor(res.data.author || '');
        setEditCategory(res.data.category || '');
        setEditStatus(res.data.status || 'draft');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Hàm loại bỏ thẻ HTML khỏi title nếu có
  function stripHtml(html: string) {
    if (!html) return '';
    if (typeof window !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    }
    return html.replace(/<[^>]+>/g, '');
  }

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`);
      alert('Đã xóa bài viết!');
      router.push('/admin/posts');
    } catch (err) {
      alert('Lỗi xóa bài viết!');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setEditImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = post.image;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await axios.post('http://localhost:8080/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      }
      await axios.put(`http://localhost:8080/posts/${id}`, {
        title: editTitle,
        content: editContent,
        image: imageUrl,
        template: editTemplate,
        author: editAuthor,
        category: editCategory,
        status: editStatus,
      });
      // Reload post detail
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setPost(res.data);
      setIsEditing(false);
      setImageFile(null);
      alert('Đã cập nhật bài viết!');
    } catch (err) {
      alert('Lỗi cập nhật bài viết!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (!post) return <div>Không tìm thấy bài viết!</div>;

  if (isEditing) {
    return (
      <>
        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto relative">
              <button 
                className="absolute top-4 right-4 z-50 text-gray-500 hover:text-red-600 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md" 
                onClick={() => setShowPreview(false)}
              >
                &times;
              </button>
              
              {/* Template Selection Header */}
              <div className="p-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Xem trước bài viết</h2>
                <p className="text-gray-600">Template: <span className="font-medium capitalize">{editTemplate}</span></p>
              </div>

              {/* Preview Content */}
              <div className="p-6">
                <NewsTemplateRenderer 
                  post={{
                    id: post.id,
                    title: editTitle,
                    content: editContent,
                    created_at: post.created_at,
                    author: editAuthor || post.author,
                    category: editCategory || post.category,
                    image: editImage || post.image,
                    template: editTemplate
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Sửa bài viết</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Tiêu đề</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              required
            />
          </div>
          
          {/* Author và Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Tác giả</label>
              <input 
                className="w-full border px-3 py-2 rounded" 
                placeholder="Nhập tên tác giả..." 
                value={editAuthor} 
                onChange={(e) => setEditAuthor(e.target.value)} 
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Danh mục</label>
              <select 
                className="w-full border px-3 py-2 rounded bg-white" 
                value={editCategory} 
                onChange={(e) => setEditCategory(e.target.value)}
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
          <div>
            <TemplateSelect 
              selectedTemplate={editTemplate}
              onTemplateChange={setEditTemplate}
              showPreview={true}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Nội dung</label>
            {isClient && editorReady && isEditing ? (
              <div className="border border-gray-300 rounded bg-white">
                {/* Toolbar riêng biệt cho decoupled editor */}
                <div ref={toolbarRef} className="border-b border-gray-300 bg-gray-50 p-2"></div>
                
                {/* Editor content */}
                <div ref={editorContainerRef} className="min-h-[300px] p-4">
                  {/* CKEditor sẽ được khởi tạo trực tiếp vào div này */}
                </div>
              </div>
            ) : (
              <textarea
                className="w-full border px-3 py-2 rounded h-32"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                placeholder="Nhập nội dung bài viết..."
              />
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Ảnh đại diện</label>
            {editImage && (
              <img src={editImage} alt="Ảnh đại diện" className="mb-2 w-full max-h-64 object-cover rounded" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          
          {/* Status */}
          <div>
            <label className="block font-semibold mb-1">Trạng thái</label>
            <select 
              className="w-full border px-3 py-2 rounded bg-white" 
              value={editStatus} 
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowPreview(true)}
              disabled={saving}
            >
              Xem trước
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Chi tiết bài viết</h2>
      
      {/* Post Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong>Tác giả:</strong> {post.author || 'Chưa có'}</div>
          <div><strong>Danh mục:</strong> {post.category || 'Chưa có'}</div>
          <div><strong>Trạng thái:</strong> {post.status || 'draft'}</div>
          <div><strong>Template:</strong> {post.template || 'template1'}</div>
        </div>
      </div>
      
      {/* Post Content with Template */}
      <div className="mb-6">
        <NewsTemplateRenderer 
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            created_at: post.created_at,
            author: post.author,
            category: post.category,
            image: post.image,
            template: post.template || 'template1'
          }}
        />
      </div>
      
      <div className="flex gap-4 mt-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.back()}>Quay lại</button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700" onClick={handleEdit}>Sửa</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Xóa bài viết</button>
      </div>
    </div>
  );
}
