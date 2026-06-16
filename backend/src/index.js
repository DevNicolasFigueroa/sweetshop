require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Importamos el router de productos
const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// 2. Montamos el router bajo el prefijo /api/products
//    Todas las rutas definidas en productRoutes.js
//    serán relativas a este prefijo
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🎂 SweetShop API funcionando" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
