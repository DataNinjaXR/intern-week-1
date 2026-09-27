const express = require("express");

const {
  getAdminDashboard,
  getUsers,
  updateUserStatus,
} = require("../controllers/adminController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  getAdminDashboard
);

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  getUsers
);

router.put(
  "/users/:id/status",
  authenticate,
  authorize("ADMIN"),
  updateUserStatus
);

module.exports = router;