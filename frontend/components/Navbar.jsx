'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          E-Shop
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/admin" className="hover:text-gray-300">Admin</Link>
          <Link href="/login" className="hover:text-gray-300">Login</Link>
          <Link href="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
}
