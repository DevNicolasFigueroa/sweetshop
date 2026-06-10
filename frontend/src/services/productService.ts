// src/services/productService.ts

// src/services/productService.ts
import type { Product } from "../types/product";

// 1. Leemos la URL base del backend desde las variables de entorno
//    VITE_API_URL está definida en el .env del frontend
const API_URL = import.meta.env.VITE_API_URL;

// 2. Función para obtener todos los productos
//    La marcamos como async porque fetch es una operación asíncrona
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/api/products`);

  // 3. Si el servidor responde con un error (404, 500, etc.)
  //    lanzamos un error con el código para manejarlo en el componente
  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.status}`);
  }

  // 4. Convertimos la respuesta a JSON y la retornamos tipada
  const data: Product[] = await response.json();
  return data;
};
