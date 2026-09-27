const db = require("../config/db");

// Create booking
const createBooking = async (req, res) => {
  try {
    const {
      facility_id,
      booking_date,
      start_time,
      end_time,
      purpose,
    } = req.body;

    // Security: always use the JWT identity, never trust user_id from body
    const userId = req.user.id;

    if (
      !facility_id ||
      !booking_date ||
      !start_time ||
      !end_time ||
      !purpose
    ) {
      return res.status(400).json({
        message: "All booking fields are required",
      });
    }

    if (start_time >= end_time) {
      return res.status(400).json({
        message: "End time must be after start time",
      });
    }

    // Check facility
    const [facilities] = await db.query(
      "SELECT id, status FROM facilities WHERE id = ?",
      [facility_id]
    );

    if (facilities.length === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    if (facilities[0].status !== "AVAILABLE") {
      return res.status(400).json({
        message: "Facility is not available for booking",
      });
    }

    // Check overlapping bookings
    const [conflicts] = await db.query(
      `SELECT id
       FROM bookings
       WHERE facility_id = ?
       AND booking_date = ?
       AND status IN ('PENDING', 'APPROVED')
       AND start_time < ?
       AND end_time > ?`,
      [facility_id, booking_date, end_time, start_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({
        message: "Facility is already booked for the selected time",
      });
    }

    const [result] = await db.query(
      `INSERT INTO bookings
       (user_id, facility_id, booking_date, start_time, end_time, purpose)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        facility_id,
        booking_date,
        start_time,
        end_time,
        purpose,
      ]
    );

    res.status(201).json({
      message: "Booking request created successfully",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};

// Get all bookings (admin only)
const getBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT
        b.id,
        b.user_id,
        u.name AS user_name,
        u.email AS user_email,
        u.role AS user_role,
        b.facility_id,
        f.name AS facility_name,
        f.location,
        b.booking_date,
        b.start_time,
        b.end_time,
        b.purpose,
        b.status,
        b.created_at
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN facilities f ON b.facility_id = f.id
      ORDER BY b.booking_date DESC, b.start_time DESC
    `);

    res.json(bookings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
};

// Get bookings of a specific user
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Security: non-admin users can only access their own bookings
    if (req.user.role !== "ADMIN" && req.user.id !== parseInt(userId)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const [bookings] = await db.query(
      `SELECT
        b.id,
        b.facility_id,
        f.name AS facility_name,
        f.location,
        b.booking_date,
        b.start_time,
        b.end_time,
        b.purpose,
        b.status,
        b.created_at
       FROM bookings b
       JOIN facilities f ON b.facility_id = f.id
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC, b.start_time DESC`,
      [userId]
    );

    res.json(bookings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch user bookings",
    });
  }
};

// Approve booking (admin only)
const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `UPDATE bookings
       SET status = 'APPROVED'
       WHERE id = ? AND status = 'PENDING'`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Pending booking not found",
      });
    }

    res.json({
      message: "Booking approved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to approve booking",
    });
  }
};

// Reject booking (admin only)
const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `UPDATE bookings
       SET status = 'REJECTED'
       WHERE id = ? AND status = 'PENDING'`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Pending booking not found",
      });
    }

    res.json({
      message: "Booking rejected successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to reject booking",
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // For non-admin users, verify they own the booking
    if (req.user.role !== "ADMIN") {
      const [bookings] = await db.query(
        "SELECT user_id FROM bookings WHERE id = ?",
        [id]
      );

      if (bookings.length === 0) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }

      if (bookings[0].user_id !== req.user.id) {
        return res.status(403).json({
          message: "Access denied",
        });
      }
    }

    const [result] = await db.query(
      `UPDATE bookings
       SET status = 'CANCELLED'
       WHERE id = ?
       AND status IN ('PENDING', 'APPROVED')`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Booking cannot be cancelled",
      });
    }

    res.json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getUserBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
};