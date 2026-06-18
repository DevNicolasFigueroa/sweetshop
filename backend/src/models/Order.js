// src/models/Order.js

const mongoose = require("mongoose");

// 1. Schema del ítem dentro del pedido
//    Guardamos precio y nombre al momento de la compra
//    porque el producto podría cambiar de precio en el futuro
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // referencia al modelo Product
      required: true,
    },
    name: {
      type: String,
      required: true, // nombre al momento de la compra
    },
    price: {
      type: Number,
      required: true, // precio al momento de la compra
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "La cantidad mínima es 1"],
    },
  },
  { _id: false }, // no necesitamos _id en cada ítem
);

// 2. Schema principal del pedido
const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "El pedido debe tener al menos un producto",
      },
    },

    total: {
      type: Number,
      required: true,
      min: [0, "El total no puede ser negativo"],
    },

    // 3. Estado del pedido — lo actualiza el webhook de Mercado Pago
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    // 4. ID de pago que retorna Mercado Pago
    //    Lo usamos para rastrear y verificar el pago
    paymentId: {
      type: String,
      default: "",
    },

    // 5. Email del comprador para identificar el pedido
    payerEmail: {
      type: String,
      required: [true, "El email del comprador es obligatorio"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
