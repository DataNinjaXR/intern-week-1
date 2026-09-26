const express = require("express");

const employeeController = require("../controllers/employeeController");
const validateEmployee = require("../middleware/validation");

const router = express.Router();

router.get("/", employeeController.getEmployees);

router.get("/:id", employeeController.getEmployee);

router.post(
  "/",
  validateEmployee,
  employeeController.createEmployee
);

router.put(
  "/:id",
  validateEmployee,
  employeeController.updateEmployee
);

router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;