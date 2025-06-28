'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'User', href: '/admin/user' },
  { name: 'Post', href: '/admin/posts' },
  { name: 'Recruitment', href: '/admin/recruitment_admin' }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-white border-r transition-all duration-200 ${collapsed ? 'w-16' : 'w-48'} flex flex-col`}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className={`font-bold text-blue-600 text-lg ${collapsed ? 'hidden' : 'block'}`}>Admin</span>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={collapsed ? 'hidden' : 'block'}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}