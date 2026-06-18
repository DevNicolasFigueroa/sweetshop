// src/pages/CartPage.tsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formattedTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(totalPrice);

  // ── Carrito vacío ─────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mt-2">
          Agrega productos desde el catálogo para comenzar
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-xl transition-colors"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  // ── Carrito con productos ─────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Carrito
          <span className="text-gray-400 font-normal text-xl ml-2">
            ({totalItems} {totalItems === 1 ? "producto" : "productos"})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-500 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos — ocupa 2/3 del ancho en desktop */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => {
            const formattedItemPrice = new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(item.price * item.quantity);

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center"
              >
                {/* Imagen */}
                <div className="w-20 h-20 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-3xl">🎂</span>
                  )}
                </div>

                {/* Info del producto */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-800 font-semibold text-sm truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs capitalize mt-0.5">
                    {item.category}
                  </p>
                  <p className="text-pink-500 font-bold mt-1">
                    {formattedItemPrice}
                  </p>
                </div>

                {/* Selector de cantidad */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    −
                  </button>
                  <span className="px-3 py-2 text-gray-800 font-medium border-x border-gray-200 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-300 hover:text-red-400 transition-colors ml-2 text-lg"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* Resumen del pedido — ocupa 1/3 del ancho en desktop */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Resumen del pedido
            </h2>

            {/* Desglose por producto */}
            <div className="flex flex-col gap-2 mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-500 truncate mr-2">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-gray-700 flex-shrink-0">
                    {new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    }).format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Línea divisora */}
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-xl text-pink-500">
                  {formattedTotal}
                </span>
              </div>
            </div>

            {/* Botón de checkout */}
            {/* La lógica de Mercado Pago va en el Paso 5 */}
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl transition-colors duration-200">
              Proceder al pago
            </button>

            {/* Link para seguir comprando */}
            <Link
              to="/products"
              className="block text-center mt-3 text-sm text-gray-400 hover:text-pink-500 transition-colors"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
