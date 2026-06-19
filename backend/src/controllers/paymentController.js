const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const Order = require("../models/Order");

// 1. Inicializamos el cliente de Mercado Pago con el access token
//    Esto se ejecuta una vez cuando el módulo se carga
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// ─── POST /api/payments/create ─────────────────────────────────────
// Recibe los items del carrito, crea la orden en MongoDB
// y genera la preferencia de pago en Mercado Pago
const createPayment = async (req, res) => {
  try {
    const { items, payerEmail } = req.body;

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // 2. Creamos la orden en MongoDB con status pending
    const order = await Order.create({
      items: items.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      payerEmail,
      status: "pending",
    });

    // 3. Construimos los items en el formato que pide Mercado Pago
    const mpItems = items.map((item) => ({
      id: item._id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: "CLP",
    }));

    // 4. Creamos la preferencia de pago en Mercado Pago
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: mpItems,

        payer: {
          email: payerEmail,
        },

        // 5. URLs de retorno según el resultado del pago
        //    Mercado Pago redirige al usuario a estas URLs
        //    e incluye el payment_id como query param
        back_urls: {
          success: `${process.env.FRONTEND_URL}/checkout/success`,
          pending: `${process.env.FRONTEND_URL}/checkout/pending`,
          failure: `${process.env.FRONTEND_URL}/checkout/failure`,
        },

        // 6. Con auto_return en approved, Mercado Pago redirige
        //    automáticamente sin que el usuario tenga que hacer clic
        auto_return: "approved",

        // 7. external_reference vincula la preferencia con nuestra orden
        //    Lo usamos en el webhook para saber qué orden actualizar
        external_reference: order._id.toString(),

        // 8. notification_url es donde Mercado Pago envía el webhook
        //    Necesita ser una URL pública — en desarrollo usaremos ngrok
        notification_url: `${process.env.BACKEND_URL}/api/payments/webhook`,
      },
    });

    // 9. Retornamos la URL de checkout y el id de la orden
    res.status(201).json({
      success: true,
      checkoutUrl: response.init_point,
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al crear el pago",
      error: error.message,
    });
  }
};

// ─── POST /api/payments/webhook ────────────────────────────────────
// Mercado Pago llama a este endpoint cuando cambia el estado de un pago
// Debe responder 200 rápidamente o Mercado Pago reintenta
const webhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    // 1. Mercado Pago envía distintos tipos de notificaciones
    //    Solo nos interesa el tipo 'payment'
    if (type !== "payment") {
      return res.status(200).json({ received: true });
    }

    // 2. Consultamos el pago completo en Mercado Pago
    //    para obtener el status y el external_reference
    const payment = new Payment(client);
    const paymentData = await payment.get({ id: data.id });

    const { status, external_reference, id: paymentId } = paymentData;

    // 3. Mapeamos el status de Mercado Pago al nuestro
    const statusMap = {
      approved: "paid",
      rejected: "failed",
      pending: "pending",
    };

    const orderStatus = statusMap[status] || "pending";

    // 4. Actualizamos la orden usando el external_reference
    //    que es el _id de nuestra orden en MongoDB
    await Order.findByIdAndUpdate(external_reference, {
      status: orderStatus,
      paymentId: paymentId.toString(),
    });

    // 5. Respondemos 200 inmediatamente
    //    Si tardamos, Mercado Pago marca el webhook como fallido
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error en webhook:", error.message);
    // 6. Aunque haya error interno, respondemos 200
    //    para que Mercado Pago no reintente indefinidamente
    res.status(200).json({ received: true });
  }
};

module.exports = { createPayment, webhook };
