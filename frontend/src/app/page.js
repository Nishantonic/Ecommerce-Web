'use client';
import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList';
import Navbar from '../../components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-4">
       <h1 className="text-3xl font-bold mb-4 text-center">Welcome to E-Shop</h1>

{/* Intro Section */}
<div className="text-center max-w-2xl mx-auto mb-10">
  <p className="text-lg text-gray-600">
    Your one-stop online store for the latest fashion, electronics, accessories,
    and more. We deliver high-quality products at affordable prices.
  </p>
</div>

{/* Categories */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
  <div className="p-6 bg-blue-50 shadow rounded-lg text-center hover:scale-105 transition">
    <h3 className="font-bold text-xl mb-2">Electronics</h3>
    <p className="text-gray-600">Mobiles, Headphones, Laptops & Accessories</p>
  </div>

  <div className="p-6 bg-pink-50 shadow rounded-lg text-center hover:scale-105 transition">
    <h3 className="font-bold text-xl mb-2">Fashion</h3>
    <p className="text-gray-600">Clothing, Shoes & Lifestyle Collections</p>
  </div>

  <div className="p-6 bg-green-50 shadow rounded-lg text-center hover:scale-105 transition">
    <h3 className="font-bold text-xl mb-2">Home & Kitchen</h3>
    <p className="text-gray-600">Cookware, Decor & Daily Essentials</p>
  </div>
</div>

{/* Why Choose Us */}
<div className="bg-gray-100 p-8 rounded-lg mb-12">
  <h2 className="text-2xl font-bold text-center mb-6">Why Shop With Us?</h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
    <div>
      <h3 className="font-semibold text-xl">Fast Delivery</h3>
      <p className="text-gray-600">We deliver across India with lightning-fast dispatch.</p>
    </div>
    <div>
      <h3 className="font-semibold text-xl">Secure Payments</h3>
      <p className="text-gray-600">Multiple payment options with 100% secure checkout.</p>
    </div>
    <div>
      <h3 className="font-semibold text-xl">24/7 Support</h3>
      <p className="text-gray-600">We are always here to help you.</p>
    </div>
  </div>
</div>

{/* Product List */}
<ProductList products={products} />

      </div>
    </div>
  );
}
