export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
          {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />}
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600 mb-2">${product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>
          {product.stock_quantity === 0 && <p className="text-red-500 text-sm">Out of Stock</p>}
        </div>
      ))}
    </div>
  );
}