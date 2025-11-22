'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) router.push('/login');
  //   else fetchUsers();
  // }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data);
      // setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <select defaultValue={user.role} onChange={(e) => updateRole(user.id, e.target.value)} className="p-1 border rounded">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}