import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, setQty, removeFromCart, cartTotal } = useCart();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-6">
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y">
            {items.map(item => (
              <li key={item.id} className="py-4 flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-20 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-gray-600">${item.price} each</div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={e => setQty(item.id, Number(e.target.value) || 1)}
                  className="input w-20"
                />
                <button onClick={() => removeFromCart(item.id)} className="btn ml-2 border border-gray-300">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card p-4 h-fit">
        <h3 className="text-lg font-semibold mb-3">Summary</h3>
        <div className="flex justify-between mb-2"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Shipping</span><span>$0.00</span></div>
        <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
        <button className="btn-primary w-full mt-4">Checkout</button>
      </div>
    </div>
  );
}
