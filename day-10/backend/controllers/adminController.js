const db = require("../config/db");

// Admin dashboard statistics
const getAdminDashboard = async (req, res) => {
  try {
    const [[users]] = await db.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[facilities]] = await db.query(
      "SELECT COUNT(*) AS total FROM facilities"
    );

    const [[bookings]] = await db.query(
      "SELECT COUNT(*) AS total FROM bookings"
    );

    const [[pendingBookings]] = await db.query(
      "SELECT COUNT(*) AS total FROM bookings WHERE status = 'PENDING'"
    );

    const [[approvedBookings]] = await db.query(
      "SELECT COUNT(*) AS total FROM bookings WHERE status = 'APPROVED'"
    );

    const [[cancelledBookings]] = await db.query(
      "SELECT COUNT(*) AS total FROM bookings WHERE status = 'CANCELLED'"
    );

    const [[maintenance]] = await db.query(
      "SELECT COUNT(*) AS total FROM maintenance WHERE status != 'COMPLETED'"
    );

    const [popularFacilities] = await db.query(`
      SELECT
        f.id,
        f.name,
        COUNT(b.id) AS booking_count
      FROM facilities f
      LEFT JOIN bookings b
        ON f.id = b.facility_id
      GROUP BY f.id, f.name
      ORDER BY booking_count DESC
      LIMIT 5
    `);

    res.json({
      statistics: {
        users: users.total,
        facilities: facilities.total,
        bookings: bookings.total,
        pendingBookings: pendingBookings.total,
        approvedBookings: approvedBookings.total,
        cancelledBookings: cancelledBookings.total,
        activeMaintenance: maintenance.total,
      },
      popularFacilities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load admin dashboard",
    });
  }
};

// Get users
const getUsers = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT
        id,
        name,
        email,
        role,
        department,
        status,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// Change user status
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const [result] = await db.query(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User status updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user status",
    });
  }
};

module.exports = {
  getAdminDashboard,
  getUsers,
  updateUserStatus,
};