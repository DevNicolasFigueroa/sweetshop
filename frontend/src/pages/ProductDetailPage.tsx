// src/pages/ProductDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { type Product } from "../types/product";
import { getProductById } from "../services/productService";
import { useCart } from "../context/cartContext";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/products");
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formattedPrice = product
    ? new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(product.price)
    : "";

  // ── Estado de carga ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Estado de error ───────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">
          {error || "Producto no encontrado"}
        </p>
        <Link
          to="/products"
          className="text-pink-500 hover:text-pink-600 text-sm font-medium"
        >
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  // ── Vista principal ───────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link to="/products" className="hover:text-pink-500 transition-colors">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Imagen */}
        <div className="bg-pink-50 rounded-2xl flex items-center justify-center h-96">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <span className="text-8xl">🎂</span>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-pink-500 uppercase tracking-wide">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-pink-500 mt-3">
            {formattedPrice}
          </p>

          <p className="text-gray-500 mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Stock */}
          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {product.stock} unidades disponibles
              </span>
            ) : (
              <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
                Sin stock
              </span>
            )}
          </div>

          {/* Selector de cantidad */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm text-gray-600 font-medium">
                Cantidad:
              </span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-gray-800 font-medium border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0 || added}
          >
            {added
              ? "✓ Agregado al carrito"
              : `Agregar al carrito — ${formattedPrice}`}
          </button>

          <Link
            to="/products"
            className="mt-4 text-sm text-gray-400 hover:text-pink-500 transition-colors text-center"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
