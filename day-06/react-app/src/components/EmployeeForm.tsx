import { useState } from "react";
import type { Employee } from "../types/employee";

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

function EmployeeForm({
  employee,
  onSave,
  onCancel,
}: EmployeeFormProps) {
  const [name, setName] = useState(employee?.name || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [department, setDepartment] = useState(
    employee?.department || "IT"
  );
  const [salary, setSalary] = useState(
    employee?.salary?.toString() || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !salary) {
      alert("Please fill all required fields.");
      return;
    }

    const newEmployee: Employee = {
      id: employee?.id || Date.now(),
      name,
      username: employee?.username || name.toLowerCase().replace(" ", ""),
      email,
      phone: employee?.phone || "",
      website: employee?.website || "",
      department,
      salary: Number(salary),
    };

    onSave(newEmployee);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
      </select>

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <div className="actions">
        <button type="submit">
          {employee ? "Update" : "Add"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;