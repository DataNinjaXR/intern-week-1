export interface Employee {
  id: number;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  department: string;
  position?: string;
  status?: string;
  salary: number;
}

export type CreateEmployeeInput = Omit<Employee, "id">;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getEmployees(): Promise<Employee[]> {
  const res = await fetch(`${API_URL}/api/employees`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }
  const data = await res.json();
  return data.data || data;
}

export async function getEmployee(id: string | number): Promise<Employee> {
  const res = await fetch(`${API_URL}/api/employees/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Employee not found");
  }
  const data = await res.json();
  return data.data || data;
}

export async function createEmployee(
  employeeData: CreateEmployeeInput
): Promise<Employee> {
  const res = await fetch(`${API_URL}/api/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create employee");
  }
  return data.data || data;
}

export async function updateEmployee(
  id: string | number,
  employeeData: UpdateEmployeeInput
): Promise<Employee> {
  const res = await fetch(`${API_URL}/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update employee");
  }
  return data.data || data;
}

export async function deleteEmployee(id: string | number): Promise<Employee> {
  const res = await fetch(`${API_URL}/api/employees/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete employee");
  }
  return data.data || data;
}
