const express = require("express");

const {
  createBooking,
  getBookings,
  getUserBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
} = require("../controllers/bookingController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Student and faculty can create bookings
router.post(
  "/",
  authenticate,
  authorize("STUDENT", "FACULTY"),
  createBooking
);

// Admin can see all bookings
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getBookings
);

// Users can see their own bookings (auth check enforced in controller)
router.get(
  "/user/:userId",
  authenticate,
  getUserBookings
);

// Admin actions: approve / reject
router.put(
  "/:id/approve",
  authenticate,
  authorize("ADMIN"),
  approveBooking
);

router.put(
  "/:id/reject",
  authenticate,
  authorize("ADMIN"),
  rejectBooking
);

// Logged-in users (any role) can cancel
router.put(
  "/:id/cancel",
  authenticate,
  cancelBooking
);

module.exports = router;