const employeeService = require("../services/employeeService");
const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const getEmployees = (req, res) => {
  const employees = employeeService.getAllEmployees();

  return successResponse(
    res,
    employees,
    "Employees fetched successfully"
  );
};

const getEmployee = (req, res) => {
  const employee = employeeService.getEmployeeById(req.params.id);

  if (!employee) {
    return errorResponse(res, "Employee not found", 404);
  }

  return successResponse(
    res,
    employee,
    "Employee fetched successfully"
  );
};

const createEmployee = (req, res) => {
  const employee = employeeService.createEmployee({
    ...req.body,
    salary: Number(req.body.salary),
  });

  return res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
};

const updateEmployee = (req, res) => {
  const employee = employeeService.updateEmployee(
    req.params.id,
    {
      ...req.body,
      salary: Number(req.body.salary),
    }
  );

  if (!employee) {
    return errorResponse(res, "Employee not found", 404);
  }

  return successResponse(
    res,
    employee,
    "Employee updated successfully"
  );
};

const deleteEmployee = (req, res) => {
  const employee = employeeService.deleteEmployee(req.params.id);

  if (!employee) {
    return errorResponse(res, "Employee not found", 404);
  }

  return successResponse(
    res,
    employee,
    "Employee deleted successfully"
  );
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};