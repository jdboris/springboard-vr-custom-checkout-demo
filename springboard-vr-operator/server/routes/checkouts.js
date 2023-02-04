import express from "express";
import * as dotenv from "dotenv";
import Checkout from "../models/checkout.js";
import fetch from "node-fetch";

dotenv.config();
const { CLIENT_APP_URL, SPRINGBOARD_API_URL } = process.env;

const checkoutRouter = express.Router();

// Springboard's booking app will request this route on click of "Continue to Checkout"
checkoutRouter.post("/", async (req, res) => {
  const { bookingId, amount, currency } = req.body;

  // Save the checkout in this app's database
  const checkout = new Checkout({
    bookingId,
    amount,
    currency,
  });
  checkout.save();

  res.json({
    checkoutId: checkout.id,
    redirectUrl: `${CLIENT_APP_URL}/checkout`,
  });
});

checkoutRouter.put("/:checkoutId/complete", async (req, res) => {
  const { checkoutId } = req.params;

  const [checkout] = Checkout.find({ id: checkoutId });

  await fetch(
    `${SPRINGBOARD_API_URL}/v1/bookings/${checkout.bookingId}/complete`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res.json({
    success: true,
  });
});

export default checkoutRouter;
