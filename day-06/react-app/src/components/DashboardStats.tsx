import type { Employee } from "../types/employee";

interface DashboardStatsProps {
  employees: Employee[];
}

function DashboardStats({ employees }: DashboardStatsProps) {
  const totalEmployees = employees.length;

  const averageSalary =
    totalEmployees > 0
      ? employees.reduce((sum, employee) => sum + employee.salary, 0) /
        totalEmployees
      : 0;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Total Employees</h3>
        <p>{totalEmployees}</p>
      </div>

      <div className="stat-card">
        <h3>Average Salary</h3>
        <p>${averageSalary.toFixed(2)}</p>
      </div>

      <div className="stat-card">
        <h3>Departments</h3>
        <p>{departments}</p>
      </div>
    </div>
  );
}

export default DashboardStats;