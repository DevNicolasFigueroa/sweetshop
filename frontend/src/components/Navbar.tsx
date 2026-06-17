// src/components/Navbar.tsx

import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-pink-500">
          🎂 SweetShop
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/products"
            className="text-sm text-gray-600 hover:text-pink-500 transition-colors"
          >
            Productos
          </Link>

          {/* Carrito con contador dinámico */}
          <Link
            to="/cart"
            className="relative text-sm text-gray-600 hover:text-pink-500 transition-colors"
          >
            Carrito
            {/* 1. Solo mostramos el badge si hay ítems */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
