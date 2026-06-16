// src/components/Navbar.tsx

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-pink-500">
          🎂 SweetShop
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/products"
            className="text-sm text-gray-600 hover:text-pink-500 transition-colors"
          >
            Productos
          </Link>
          <Link
            to="/cart"
            className="text-sm text-gray-600 hover:text-pink-500 transition-colors"
          >
            Carrito
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
