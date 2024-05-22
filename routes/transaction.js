const express = require("express");
const router = express.Router();
const UtilityResponse = require("../utility/UtilityResponse");
const { config } = require("dotenv");
const Transaction = require("../classes/Transaction");

config();
const stripeKey = process.env.STRIPE_KEY;

const stripe = require("stripe")(stripeKey);

router.post("/create-checkout-session", async (req, res) => {
  const { actionId, amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: "Support Action",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel`,
    metadata: { actionId, amount },
  });

  res.json({ id: session.id });
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { actionId, amount } = session.metadata;
      const userId = session.customer_email;
      const transaction = new Transaction(
        null, // transactionId will be auto-incremented
        userId,
        actionId,
        amount / 100,
        new Date(session.created * 1000)
      );

      const dbResponse = transaction.saveTransaction();
      if (dbResponse.statusCode !== 200) {
        return res
          .status(500)
          .json(
            UtilityResponse.generateResponse(500, "Failed to save transaction")
          );
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
