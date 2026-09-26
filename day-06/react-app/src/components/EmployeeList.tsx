import type { Employee } from "../types/employee";

interface EmployeeListProps {
  employees: Employee[];
  onDetails: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

function EmployeeList({
  employees,
  onDetails,
  onEdit,
  onDelete,
}: EmployeeListProps) {
  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <div className="employee-card" key={employee.id}>
          <h3>{employee.name}</h3>

          <p>
            <strong>Email:</strong> {employee.email}
          </p>

          <p>
            <strong>Department:</strong> {employee.department}
          </p>

          <p>
            <strong>Salary:</strong> ${employee.salary}
          </p>

          <div className="actions">
            <button onClick={() => onDetails(employee)}>Details</button>

            <button onClick={() => onEdit(employee)}>Edit</button>

            <button onClick={() => onDelete(employee.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;