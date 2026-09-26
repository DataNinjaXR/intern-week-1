const employees = require("../models/employeeModel");

const getAllEmployees = () => {
  return employees;
};

const getEmployeeById = (id) => {
  return employees.find((employee) => employee.id === Number(id));
};

const createEmployee = (employeeData) => {
  const newEmployee = {
    id:
      employees.length > 0
        ? Math.max(...employees.map((employee) => employee.id)) + 1
        : 1,
    ...employeeData,
  };

  employees.push(newEmployee);

  return newEmployee;
};

const updateEmployee = (id, employeeData) => {
  const index = employees.findIndex(
    (employee) => employee.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  employees[index] = {
    ...employees[index],
    ...employeeData,
    id: Number(id),
  };

  return employees[index];
};

const deleteEmployee = (id) => {
  const index = employees.findIndex(
    (employee) => employee.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  const deletedEmployee = employees.splice(index, 1);

  return deletedEmployee[0];
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};