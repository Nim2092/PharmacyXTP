"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:8080/posts/${id}`)
      .then(res => {
        setPost(res.data);
        setEditTitle(res.data.title);
        setEditContent(res.data.content);
        setEditImage(res.data.image || null);
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
          <div>
            <label className="block font-semibold mb-1">Nội dung</label>
            <CKEditor
              editor={ClassicEditor as any}
              data={editContent}
              onChange={(_event: any, editor: any) => setEditContent(editor.getData())}
            />
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
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow text-gray-800">
      <h1 className="text-2xl font-bold mb-4">{stripHtml(post.title)}</h1>
      {post.image && <img src={post.image} alt="Ảnh đại diện" className="mb-4 w-full max-h-64 object-cover rounded" />}
      <div className="mb-4 text-gray-600 italic text-right">
        Ngày tạo: {post.created_at ? new Date(post.created_at).toLocaleString() : '---'}
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex gap-4 mt-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.back()}>Quay lại</button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700" onClick={handleEdit}>Sửa</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Xóa bài viết</button>
      </div>
    </div>
  );
}
