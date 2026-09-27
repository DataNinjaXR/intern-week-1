const express = require("express");

const {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} = require("../controllers/maintenanceController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Admin only
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  getMaintenance
);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createMaintenance
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateMaintenance
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteMaintenance
);

module.exports = router;