import type { Employee } from "../types/employee";

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
}

function EmployeeDetails({
  employee,
  onClose,
}: EmployeeDetailsProps) {
  return (
    <div className="details">
      <h2>Employee Details</h2>

      <p>
        <strong>Name:</strong> {employee.name}
      </p>

      <p>
        <strong>Username:</strong> {employee.username}
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Phone:</strong> {employee.phone}
      </p>

      <p>
        <strong>Website:</strong> {employee.website}
      </p>

      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      <p>
        <strong>Salary:</strong> ${employee.salary}
      </p>

      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default EmployeeDetails;