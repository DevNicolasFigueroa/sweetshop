// src/context/CartContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";
import { type CartItem, type Product } from "../types/product";

// 1. Definimos qué expone el contexto hacia afuera
//    Cualquier componente que consuma el contexto
//    tendrá acceso a estas propiedades y funciones
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// 2. Creamos el contexto con undefined como valor inicial
//    Lo inicializamos en undefined para detectar si alguien
//    intenta usarlo fuera del provider
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. El Provider es el componente que envuelve la app
//    y hace disponible el estado del carrito a todos sus hijos
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // ── Agregar producto al carrito ───────────────────────────────────
  const addToCart = (product: Product, quantity: number) => {
    setItems((prev) => {
      // 4. Verificamos si el producto ya está en el carrito
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        // 5. Si ya existe, sumamos la cantidad
        //    Math.min asegura que no superemos el stock disponible
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }

      // 6. Si no existe, lo agregamos como nuevo ítem
      return [...prev, { ...product, quantity }];
    });
  };

  // ── Eliminar producto del carrito ─────────────────────────────────
  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // ── Actualizar cantidad de un producto ────────────────────────────
  const updateQuantity = (productId: string, quantity: number) => {
    // 7. Si la cantidad llega a 0, eliminamos el producto
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // ── Vaciar el carrito ─────────────────────────────────────────────
  const clearCart = () => setItems([]);

  // ── Valores derivados ─────────────────────────────────────────────
  // 8. Estos valores se recalculan automáticamente cada vez
  //    que cambia el array items — no necesitan estado propio
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 9. Hook personalizado para consumir el contexto
//    En lugar de importar CartContext y useContext en cada componente,
//    exportamos un hook que hace ambas cosas y valida que esté dentro del provider
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
