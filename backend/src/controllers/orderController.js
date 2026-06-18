// src/controllers/orderController.js

const Order = require("../models/Order");

// ─── GET /api/orders ───────────────────────────────────────────────
// Retorna todos los pedidos — solo para el panel admin
const getOrders = async (req, res) => {
  try {
    // 1. Ordenamos del más reciente al más antiguo
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los pedidos",
      error: error.message,
    });
  }
};

// ─── GET /api/orders/:id ───────────────────────────────────────────
// Retorna un pedido por su _id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el pedido",
      error: error.message,
    });
  }
};

// ─── POST /api/orders ──────────────────────────────────────────────
// Crea un nuevo pedido desde el carrito del frontend
const createOrder = async (req, res) => {
  try {
    const { items, total, payerEmail } = req.body;

    // 1. Validación básica antes de crear el pedido
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El pedido debe tener al menos un producto",
      });
    }

    const order = await Order.create({
      items,
      total,
      payerEmail,
      status: "pending", // siempre empieza en pending
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al crear el pedido",
      error: error.message,
    });
  }
};

// ─── PATCH /api/orders/:id/status ─────────────────────────────────
// Actualiza solo el estado de un pedido
// Lo llama el webhook de Mercado Pago en el Paso 5
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentId } = req.body;

    // 1. Verificamos que el status sea válido
    const validStatuses = ["pending", "paid", "failed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Estado inválido. Debe ser: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentId },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Pedido no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar el pedido",
      error: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
};
