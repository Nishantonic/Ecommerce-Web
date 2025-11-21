'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock_quantity: 0, image_url: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login');
    else fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setNewProduct({ name: '', description: '', price: '', stock_quantity: 0, image_url: '' });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ stock_quantity: stock }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        if (!res.ok) throw new Error((await res.json()).error);
        fetchProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Inventory Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={createProduct} className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl mb-2">Add Product</h2>
        <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="block w-full p-2 mb-2 border rounded" required />
        <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="block w-full p-2 mb-2 border rounded" />
        <input type="number" step="0.01" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="block w-full p-2 mb-2 border rounded" required />
        <input type="number" placeholder="Stock" value={newProduct.stock_quantity} onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) || 0 })} className="block w-full p-2 mb-2 border rounded" required />
        <input type="url" placeholder="Image URL" value={newProduct.image_url} onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })} className="block w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Add</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded bg-white">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-lg font-semibold">${product.price}</p>
            <label>Stock: </label>
            <input type="number" defaultValue={product.stock_quantity} onBlur={(e) => updateStock(product.id, parseInt(e.target.value) || 0)} className="w-20 p-1 border rounded ml-2" />
            <br />
            {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover mt-2" />}
            <button onClick={() => deleteProduct(product.id)} className="mt-2 bg-red-500 text-white p-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}