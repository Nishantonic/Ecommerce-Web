'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <a href="/admin/inventory" className="bg-blue-500 text-white p-4 rounded text-center">Inventory & Stock</a>
        <a href="/admin/users" className="bg-green-500 text-white p-4 rounded text-center">User Management</a>
      </div>
      <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">Logout</button>
    </div>
  );
}