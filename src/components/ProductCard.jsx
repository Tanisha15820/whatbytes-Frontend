import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card p-4">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-md" />
      </Link>
      <div className="mt-3">
        <Link to={`/product/${product.id}`} className="block font-semibold hover:underline">
          {product.title}
        </Link>
        <p className="text-gray-700">${product.price}</p>
        <button onClick={() => onAdd(product)} className="btn-primary w-full mt-3">Add to Cart</button>
      </div>
    </div>
  );
}
