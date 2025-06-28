'use client';

import { usePathname } from 'next/navigation';

export default function AdminDashboard() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome to Admin Dashboard
        </h1>
      </main>
    </div>
  );
}