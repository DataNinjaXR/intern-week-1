import { useEffect, useState } from "react";
import "./App.css";

import DashboardStats from "./components/DashboardStats";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetails from "./components/EmployeeDetails";

import type { Employee } from "./types/employee";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | undefined>();

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        const departments = ["IT", "HR", "Finance", "Marketing"];

        const formattedEmployees: Employee[] = data.map(
          (employee: any, index: number) => ({
            id: employee.id,
            name: employee.name,
            username: employee.username,
            email: employee.email,
            phone: employee.phone,
            website: employee.website,
            department: departments[index % departments.length],
            salary: 30000 + index * 5000,
          })
        );

        setEmployees(formattedEmployees);
        setFilteredEmployees(formattedEmployees);
      } catch (err) {
        setError("Unable to load employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Search, filter and sort
  useEffect(() => {
    let result = [...employees];

    if (search.trim() !== "") {
      result = result.filter(
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          employee.email
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (department !== "All") {
      result = result.filter(
        (employee) => employee.department === department
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "salary") {
      result.sort((a, b) => b.salary - a.salary);
    }

    if (sortBy === "id") {
      result.sort((a, b) => a.id - b.id);
    }

    setFilteredEmployees(result);
  }, [employees, search, department, sortBy]);

  // Add or update employee
  const handleSave = async (employee: Employee) => {
    try {
      if (editingEmployee) {
        await fetch(`${API_URL}/${employee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        });

        setEmployees((current) =>
          current.map((item) =>
            item.id === employee.id ? employee : item
          )
        );
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        });

        setEmployees((current) => [...current, employee]);
      }

      setShowForm(false);
      setEditingEmployee(undefined);
    } catch {
      alert("Unable to save employee.");
    }
  };

  // Delete employee
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setEmployees((current) =>
        current.filter((employee) => employee.id !== id)
      );
    } catch {
      alert("Unable to delete employee.");
    }
  };

  // Edit employee
  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
    setSelectedEmployee(null);
  };

  // Add employee
  const handleAdd = () => {
    setEditingEmployee(undefined);
    setShowForm(true);
    setSelectedEmployee(null);
  };

  if (loading) {
    return <h2 className="loading">Loading employees...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="app">
      <header>
        <h1>Employee Management Dashboard</h1>

        <button onClick={handleAdd}>+ Add Employee</button>
      </header>

      <DashboardStats employees={employees} />

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="salary">Sort by Salary</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(undefined);
          }}
        />
      )}

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      <EmployeeList
        employees={filteredEmployees}
        onDetails={setSelectedEmployee}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;