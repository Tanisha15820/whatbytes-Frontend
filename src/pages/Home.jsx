import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const query = {
    search: params.get("search") || "",
    category: params.get("category") || "",
    minPrice: params.get("minPrice") || "0",
    maxPrice: params.get("maxPrice") || "1000",
    brand: params.get("brand") || ""
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/products`, { params: query }).then(res => {
      setProducts(res.data);
    }).finally(() => setLoading(false));
  }, [params.toString()]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[16rem_1fr] gap-6">
      <Sidebar />
      <section>
        <h1 className="text-2xl font-bold text-brand-900 mb-4">Product Listing</h1>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <div className="card p-6 text-center">No products found. Try different filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
