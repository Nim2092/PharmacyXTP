'use client';
import PostForm from './PostForm';
import PostList from './PostList';
import { useState } from 'react';

export default function AdminPostsPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="mx-auto p-8 w-full bg-white shadow-md rounded-lg text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Quản lý bài viết</h1>
      <PostForm onCreated={() => setRefresh(r => !r)} />
      {/* Khi tạo bài viết mới, refresh danh sách */}
      <PostList key={refresh ? '1' : '0'} />
    </div>
  );
}