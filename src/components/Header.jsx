import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import SearchBar from "./SearchBar.jsx";

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation(); // Detect current route
  const onCartPage = location.pathname === "/cart"; // Check if on cart page

  return (
    <header className="bg-brand-800 text-white">
      <div className="container-wide h-[var(--header-height)] flex items-center justify-between gap-4">
        {/* Logo / Home symbol */}
        {onCartPage ? (
          <Link
            to="/?category=Home"
            className="flex items-center gap-2 text-white hover:text-gray-200"
          >
            <Home size={28} className="text-white" />
            <span className="font-extrabold text-2xl tracking-tight">Home</span>
          </Link>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white text-brand-800 font-bold rounded-full">
              W
            </div>
            <span className="font-extrabold text-2xl tracking-tight">WhatBytes</span>
          </Link>
        )}

        {/* 🔍 Search bar */}
        <SearchBar />

        {/* Right side - Cart only */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative btn bg-brand-900 hover:bg-brand-700"
          >
            <ShoppingCart size={18} className="mr-2" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
