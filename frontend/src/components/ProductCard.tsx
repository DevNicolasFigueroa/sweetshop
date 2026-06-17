// src/components/ProductCard.tsx

import { Link } from "react-router-dom";
import { type Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(product.price);

  return (
    // 1. Envolvemos toda la card en un Link que navega al detalle
    <Link to={`/products/${product._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-shadow duration-300">
        {/* Imagen del producto */}
        <div className="h-48 bg-pink-50 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">🎂</span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <span className="text-xs font-medium text-pink-500 uppercase tracking-wide">
            {product.category}
          </span>

          <h3 className="text-gray-800 font-semibold mt-1 text-base leading-snug">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-900">
              {formattedPrice}
            </span>

            {product.stock > 0 ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Stock: {product.stock}
              </span>
            ) : (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                Sin stock
              </span>
            )}
          </div>

          {/* 2. Detenemos la propagación del Link en el botón
                para que el clic en "Agregar" no navegue al detalle */}
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
