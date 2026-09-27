const express = require("express");

const {
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
  getFacilityAvailability,
} = require("../controllers/facilityController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getFacilities);

router.get(
  "/:id/availability",
  authenticate,
  getFacilityAvailability
);

router.get("/:id", authenticate, getFacilityById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createFacility
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  updateFacility
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteFacility
);

module.exports = router;