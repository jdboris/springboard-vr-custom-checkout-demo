import express from "express";
import Booking from "../models/booking.js";

const bookingRouter = express.Router();

// This route will be requested by the Operator's app after the checkout is complete.
bookingRouter.put("/:bookingId/complete", async (req, res) => {
  const { bookingId } = req.params;

  // 1. Mark the booking as complete in this app's database
  const [booking] = Booking.find({ id: bookingId });
  booking.isComplete = true;
  booking.save();

  console.log(`User completed checking. Scheduling booking: `, booking);

  res.json({ success: true });
});

// This route will show all bookings (for testing purposing)
bookingRouter.get("/", async (req, res) => {
  const bookings = Booking.find({});

  res.json({ bookings });
});

export default bookingRouter;
