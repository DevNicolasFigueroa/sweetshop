import { useEffect, useState } from "react";
import { type Product } from "../types/product";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

// 1. Categorías disponibles — deben coincidir con el enum del modelo
const CATEGORIES = ["tortas", "cupcakes", "galletas", "macarons", "otros"];

const ProductsPage = () => {
  // 2. Estado local de la página
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 3. useEffect se ejecuta cuando el componente monta
  //    y cada vez que cambia activeCategory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Si activeCategory está vacío, trae todos los productos
        const data = await getProducts(activeCategory || undefined);
        setProducts(data);
      } catch (err) {
        setError("No se pudieron cargar los productos. Intenta de nuevo.");
      } finally {
        // 4. finally se ejecuta siempre, haya error o no
        //    Es el lugar correcto para apagar el loading
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Nuestros productos</h1>
        <p className="text-gray-500 mt-1">
          Elaborados artesanalmente con los mejores ingredientes
        </p>
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2 mb-8">
        {/* Botón "Todos" */}
        <button
          onClick={() => setActiveCategory("")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${
              activeCategory === ""
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Todos
        </button>

        {/* Botón por cada categoría */}
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors duration-200
              ${
                activeCategory === category
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Grid de productos */}
      {!loading && !error && (
        <>
          {/* Contador de resultados */}
          <p className="text-sm text-gray-400 mb-4">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                // 5. La key siempre debe ser el _id único de MongoDB
                //    nunca el índice del array
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              No hay productos en esta categoría
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
