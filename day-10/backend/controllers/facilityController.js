const db = require("../config/db");

// Get all facilities
const getFacilities = async (req, res) => {
  try {
    const [facilities] = await db.query(
      "SELECT * FROM facilities ORDER BY created_at DESC"
    );

    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch facilities",
    });
  }
};

// Get single facility
const getFacilityById = async (req, res) => {
  try {
    const { id } = req.params;

    const [facilities] = await db.query(
      "SELECT * FROM facilities WHERE id = ?",
      [id]
    );

    if (facilities.length === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    res.json(facilities[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch facility",
    });
  }
};

// Create facility
const createFacility = async (req, res) => {
  try {
    const {
      name,
      type,
      location,
      capacity,
      description,
      status,
      equipment,
    } = req.body;

    if (!name || !type || !location || !capacity) {
      return res.status(400).json({
        message: "Name, type, location and capacity are required",
      });
    }

    const [result] = await db.query(
      `INSERT INTO facilities
      (name, type, location, capacity, description, status, equipment)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        type,
        location,
        capacity,
        description || null,
        status || "AVAILABLE",
        equipment || null,
      ]
    );

    res.status(201).json({
      message: "Facility created successfully",
      facilityId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create facility",
    });
  }
};

// Update facility
const updateFacility = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      type,
      location,
      capacity,
      description,
      status,
      equipment,
    } = req.body;

    const [result] = await db.query(
      `UPDATE facilities
       SET name = ?,
           type = ?,
           location = ?,
           capacity = ?,
           description = ?,
           status = ?,
           equipment = ?
       WHERE id = ?`,
      [
        name,
        type,
        location,
        capacity,
        description || null,
        status || "AVAILABLE",
        equipment || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    res.json({
      message: "Facility updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update facility",
    });
  }
};

// Delete facility
const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM facilities WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    res.json({
      message: "Facility deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Cannot delete facility if it has existing bookings or maintenance records",
    });
  }
};

// Get facility availability
const getFacilityAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const [facility] = await db.query(
      "SELECT id, name, status FROM facilities WHERE id = ?",
      [id]
    );

    if (facility.length === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    const [bookings] = await db.query(
      `SELECT
        id,
        start_time,
        end_time,
        status,
        purpose
       FROM bookings
       WHERE facility_id = ?
       AND booking_date = ?
       AND status IN ('PENDING', 'APPROVED')
       ORDER BY start_time`,
      [id, date]
    );

    res.json({
      facility: facility[0],
      date,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch availability",
    });
  }
};


module.exports = {
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
  getFacilityAvailability,
};