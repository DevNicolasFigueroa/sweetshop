// src/routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const { createPayment, webhook } = require("../controllers/paymentController");

router.post("/create", createPayment); // POST /api/payments/create
router.post("/webhook", webhook); // POST /api/payments/webhook

module.exports = router;
