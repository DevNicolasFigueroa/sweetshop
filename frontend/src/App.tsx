import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    // 1. BrowserRouter habilita la navegación por URL en toda la app
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* 2. Routes es el contenedor de todas las rutas */}

        <Navbar />
        <Routes>
          {/* 3. Cada Route define qué componente renderizar según la URL */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
