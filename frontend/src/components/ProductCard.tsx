// src/components/ProductCard.tsx

// 1. Importamos la interfaz Product que definimos en la Fase 01
//    Así TypeScript sabe exactamente qué propiedades tiene un producto
// src/components/ProductCard.tsx
// 1. Importamos la interfaz Product que definimos en la Fase 01
//    Así TypeScript sabe exactamente qué propiedades tiene un producto
import type { Product } from "../types/product";

// 2. Definimos las props del componente
//    ProductCard recibe un solo producto como prop
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // 3. Formateamos el precio en pesos chilenos
  //    Intl.NumberFormat es la forma estándar de formatear moneda en JS
  const formattedPrice = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(product.price);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Imagen del producto */}
      <div className="h-48 bg-pink-50 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          // 4. Placeholder mientras no hay imágenes reales
          //    Lo reemplazaremos en la Fase 04 con Cloudinary
          <span className="text-5xl">🎂</span>
        )}
      </div>

      {/* Contenido de la card */}
      <div className="p-4">
        {/* Categoría */}
        <span className="text-xs font-medium text-pink-500 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Nombre */}
        <h3 className="text-gray-800 font-semibold mt-1 text-base leading-snug">
          {product.name}
        </h3>

        {/* Descripción truncada a 2 líneas */}
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Footer de la card: precio y stock */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            {formattedPrice}
          </span>

          {/* 5. Indicador de stock */}
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

        {/* Botón agregar al carrito */}
        {/* Por ahora solo visual — la lógica va en la Fase 03 */}
        <button
          className="w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
