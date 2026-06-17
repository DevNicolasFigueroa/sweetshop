// Esta interfaz describe cómo luce un producto en toda la app.
// Cualquier componente que reciba un producto sabrá exactamente
// qué propiedades esperar — eso es la ventaja de TypeScript.

export interface Product {
  _id: string; // MongoDB genera este ID automáticamente
  name: string; // Nombre del producto
  description: string; // Descripción
  price: number; // Precio en CLP
  category: string; // Categoría (tortas, cupcakes, galletas, etc.)
  image: string; // URL de la imagen
  stock: number; // Unidades disponibles
  available: boolean; // Si está visible en el catálogo
  createdAt: string; // Fecha de creación (la agrega MongoDB)
}

// 1. Un CartItem es un Product con una cantidad adicional
//    Extendemos la interfaz existente en lugar de repetir campos
export interface CartItem extends Product {
  quantity: number;
}
