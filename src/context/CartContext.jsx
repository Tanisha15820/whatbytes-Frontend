import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const exists = state.items.find(i => i.id === action.product.id);
      let items;
      if (exists) {
        items = state.items.map(i => i.id === action.product.id ? { ...i, qty: i.qty + (action.qty || 1) } : i);
      } else {
        items = [...state.items, { ...action.product, qty: action.qty || 1 }];
      }
      return { ...state, items };
    }
    case "remove": {
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    }
    case "setQty": {
      const items = state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i);
      return { ...state, items };
    }
    case "load": {
      return action.state || state;
    }
    default:
      return state;
  }
}

const initial = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const raw = localStorage.getItem("cart-state");
    if (raw) {
      dispatch({ type: "load", state: JSON.parse(raw) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-state", JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({
    items: state.items,
    addToCart: (product, qty = 1) => dispatch({ type: "add", product, qty }),
    removeFromCart: (id) => dispatch({ type: "remove", id }),
    setQty: (id, qty) => dispatch({ type: "setQty", id, qty }),
    cartCount: state.items.reduce((sum, i) => sum + i.qty, 0),
    cartTotal: state.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
