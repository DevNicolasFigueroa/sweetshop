// src/index.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// 1. Importamos las rutas de pago
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// 2. Registramos las rutas de pago
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🎂 SweetShop API funcionando" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
