"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from '@/components/AdminSidebar';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Nếu là trang admin thì chỉ render children (không render banner, aside, header...)

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-950 text-white">
          <AdminSidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}