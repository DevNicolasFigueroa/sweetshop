// src/services/productService.ts

import { type Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL;

// 1. Obtener todos los productos
//    Acepta un category opcional para filtrar
export const getProducts = async (category?: string): Promise<Product[]> => {
  const url = category
    ? `${API_URL}/api/products?category=${category}`
    : `${API_URL}/api/products`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.status}`);
  }

  // 2. Nuestra API responde con { success, count, data }
  //    Extraemos solo el array data
  const json = await response.json();
  return json.data;
};

// 3. Obtener un producto por id
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products/${id}`);

  if (!response.ok) {
    throw new Error(`Producto no encontrado: ${response.status}`);
  }

  const json = await response.json();
  return json.data;
};
