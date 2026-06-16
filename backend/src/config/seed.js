// src/config/seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// 1. Datos iniciales de la pastelería
//    Estos son los productos que aparecerán en el catálogo
const products = [
  {
    name: "Torta de chocolate belga",
    description:
      "Tres pisos de bizcocho húmedo con ganache de chocolate belga 70% cacao y decoración artesanal",
    price: 28000,
    category: "tortas",
    image: "",
    stock: 3,
    available: true,
  },
  {
    name: "Torta de frambuesa y crema",
    description:
      "Bizcocho de vainilla con crema chantilly y frambuesas frescas, decorada con flores comestibles",
    price: 32000,
    category: "tortas",
    image: "",
    stock: 2,
    available: true,
  },
  {
    name: "Cupcake de vainilla",
    description:
      "Suave cupcake con frosting de buttercream de vainilla y sprinkles de colores",
    price: 2500,
    category: "cupcakes",
    image: "",
    stock: 30,
    available: true,
  },
  {
    name: "Cupcake red velvet",
    description:
      "Clásico red velvet con frosting de queso crema y decoración de terciopelo rojo",
    price: 3000,
    category: "cupcakes",
    image: "",
    stock: 24,
    available: true,
  },
  {
    name: "Cupcake de limón",
    description: "Cupcake cítrico con crema de limón y merengue tostado",
    price: 2800,
    category: "cupcakes",
    image: "",
    stock: 18,
    available: true,
  },
  {
    name: "Galletas de mantequilla",
    description:
      "Pack de 6 galletas artesanales de mantequilla con decoración de glasa real",
    price: 4500,
    category: "galletas",
    image: "",
    stock: 15,
    available: true,
  },
  {
    name: "Galletas de chocolate chips",
    description: "Pack de 6 galletas suaves con chips de chocolate semi amargo",
    price: 4000,
    category: "galletas",
    image: "",
    stock: 20,
    available: true,
  },
  {
    name: "Macarons surtidos",
    description:
      "Caja de 6 macarons franceses en sabores: fresa, pistacho, chocolate, vainilla, café y frambuesa",
    price: 8500,
    category: "macarons",
    image: "",
    stock: 10,
    available: true,
  },
  {
    name: "Macarons de temporada",
    description:
      "Edición limitada de macarons con sabores de temporada. Relleno artesanal.",
    price: 9500,
    category: "macarons",
    image: "",
    stock: 8,
    available: true,
  },
  {
    name: "Brownie artesanal",
    description:
      "Brownie húmedo de chocolate amargo con nueces, cortado en porciones individuales",
    price: 2200,
    category: "otros",
    image: "",
    stock: 25,
    available: true,
  },
];

// 2. Función principal del seed
const seedDB = async () => {
  try {
    // Conectamos a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado para seed...");

    // 3. Eliminamos TODOS los productos existentes antes de insertar
    //    Esto garantiza que el seed siempre parte de cero
    //    y no genera duplicados si lo ejecutas más de una vez
    await Product.deleteMany({});
    console.log("Colección products limpiada");

    // 4. insertMany inserta todos los documentos en una sola operación
    //    Es más eficiente que hacer Product.create() en un loop
    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} productos insertados correctamente`);

    await mongoose.disconnect();
    console.log("Seed completado. Conexión cerrada.");
  } catch (error) {
    console.error("Error en el seed:", error.message);
    process.exit(1);
  }
};

seedDB();
