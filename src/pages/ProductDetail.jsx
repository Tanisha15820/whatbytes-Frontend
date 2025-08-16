import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API}/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="card p-4">
        <img src={product.image} alt={product.title} className="w-full rounded-md object-cover" />
      </div>
      <div className="card p-6 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="text-gray-500">Category</span><div>{product.category}</div></div>
          <div><span className="text-gray-500">Brand</span><div>{product.brand}</div></div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Quantity</label>
          <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value) || 1)} className="input w-24" />
        </div>
        <button onClick={() => addToCart(product, qty)} className="btn-primary w-full">Add to Cart</button>
      </div>
    </div>
  );
}
