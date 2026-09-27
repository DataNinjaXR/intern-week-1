const db = require("../config/db");

// Get all maintenance records
const getMaintenance = async (req, res) => {
  try {
    const [records] = await db.query(`
      SELECT
        m.id,
        m.facility_id,
        f.name AS facility_name,
        m.issue,
        m.priority,
        m.start_date,
        m.expected_completion,
        m.description,
        m.status,
        m.created_at
      FROM maintenance m
      JOIN facilities f ON m.facility_id = f.id
      ORDER BY m.start_date DESC
    `);

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch maintenance records",
    });
  }
};

// Create maintenance record
const createMaintenance = async (req, res) => {
  try {
    const {
      facility_id,
      issue,
      priority,
      start_date,
      expected_completion,
      description,
      status,
    } = req.body;

    if (!facility_id || !issue || !start_date) {
      return res.status(400).json({
        message: "Facility, issue and start date are required",
      });
    }

    const [facilities] = await db.query(
      "SELECT id FROM facilities WHERE id = ?",
      [facility_id]
    );

    if (facilities.length === 0) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    const [result] = await db.query(
      `INSERT INTO maintenance
       (facility_id, issue, priority, start_date,
        expected_completion, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        facility_id,
        issue,
        priority || "MEDIUM",
        start_date,
        expected_completion || null,
        description || null,
        status || "SCHEDULED",
      ]
    );

    // Block facility while maintenance is active
    if (status !== "COMPLETED") {
      await db.query(
        `UPDATE facilities
         SET status = 'UNDER_MAINTENANCE'
         WHERE id = ?`,
        [facility_id]
      );
    }

    res.status(201).json({
      message: "Maintenance record created successfully",
      maintenanceId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create maintenance record",
    });
  }
};

// Update maintenance
const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      issue,
      priority,
      start_date,
      expected_completion,
      description,
      status,
    } = req.body;

    const [records] = await db.query(
      "SELECT facility_id FROM maintenance WHERE id = ?",
      [id]
    );

    if (records.length === 0) {
      return res.status(404).json({
        message: "Maintenance record not found",
      });
    }

    const facilityId = records[0].facility_id;

    await db.query(
      `UPDATE maintenance
       SET issue = ?,
           priority = ?,
           start_date = ?,
           expected_completion = ?,
           description = ?,
           status = ?
       WHERE id = ?`,
      [
        issue,
        priority,
        start_date,
        expected_completion || null,
        description || null,
        status,
        id,
      ]
    );

    // If completed, make facility available again
    if (status === "COMPLETED") {
      await db.query(
        `UPDATE facilities
         SET status = 'AVAILABLE'
         WHERE id = ?`,
        [facilityId]
      );
    } else {
      await db.query(
        `UPDATE facilities
         SET status = 'UNDER_MAINTENANCE'
         WHERE id = ?`,
        [facilityId]
      );
    }

    res.json({
      message: "Maintenance updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update maintenance",
    });
  }
};

// Delete maintenance
const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    const [records] = await db.query(
      "SELECT facility_id FROM maintenance WHERE id = ?",
      [id]
    );

    if (records.length === 0) {
      return res.status(404).json({
        message: "Maintenance record not found",
      });
    }

    const facilityId = records[0].facility_id;

    await db.query(
      "DELETE FROM maintenance WHERE id = ?",
      [id]
    );

    await db.query(
      `UPDATE facilities
       SET status = 'AVAILABLE'
       WHERE id = ?`,
      [facilityId]
    );

    res.json({
      message: "Maintenance record deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete maintenance",
    });
  }
};

module.exports = {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};