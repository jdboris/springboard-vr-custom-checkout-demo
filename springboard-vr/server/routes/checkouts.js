import express from "express";
import Booking from "../models/booking.js";
import Location from "../models/location.js";
import fetch from "node-fetch";

const checkoutRouter = express.Router();

// Springboard's booking page will request this route on click of "Continue to Checkout"
checkoutRouter.post("/:reservationUUID", async (req, res) => {
  const { reservationUUID } = req.params;
  const { experienceId, priceId, startTime } = req.body;

  const [location] = Location.find({ reservationUUID });

  const booking = new Booking({
    isComplete: false,
    experienceId,
    priceId,
    startTime,
  });
  booking.save();

  // Send the checkout data to the location's "checkout.created" webhook
  const reponse = await fetch(location.webhooks["checkout.created"], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookingId: booking.id,
      amount: booking.getTotalCost(),
      currency: location.currency,
    }),
  });

  if (!reponse.ok) {
    throw new Error("Operator's app responded with failure.");
  }

  const { checkoutId, redirectUrl } = await reponse.json();

  // 3. Redirect the user to the URL provided by the operator's app.
  //    Then, the operator's app will complete the booking (PUT /bookings).
  res.json({ redirectUrl: `${redirectUrl}?checkoutId=${checkoutId}` });
});

export default checkoutRouter;
