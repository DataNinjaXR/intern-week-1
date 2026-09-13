
import java.util.ArrayList;
import java.util.Scanner;

class Employee {
    int id;
    String name;
    String department;
    double salary;

    Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    void displayEmployee() {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Department: " + department);
        System.out.println("Salary: " + salary);
        System.out.println("----------------------------");
    }
}

public class EmployeeManagement {

    static ArrayList<Employee> employees = new ArrayList<>();
    static Scanner scanner = new Scanner(System.in);

    // 1. Add Employee
    public static void addEmployee() {
        System.out.print("Enter employee ID: ");
        int id = scanner.nextInt();
        scanner.nextLine();

        if (findEmployee(id) != null) {
            System.out.println("Employee ID already exists.");
            return;
        }

        System.out.print("Enter employee name: ");
        String name = scanner.nextLine();

        System.out.print("Enter department: ");
        String department = scanner.nextLine();

        System.out.print("Enter salary: ");
        double salary = scanner.nextDouble();

        employees.add(new Employee(id, name, department, salary));

        System.out.println("Employee added successfully.");
    }

    // 2. Update Employee
    public static void updateEmployee() {
        System.out.print("Enter employee ID to update: ");
        int id = scanner.nextInt();
        scanner.nextLine();

        Employee employee = findEmployee(id);

        if (employee == null) {
            System.out.println("Employee not found.");
            return;
        }

        System.out.print("Enter new name: ");
        employee.name = scanner.nextLine();

        System.out.print("Enter new department: ");
        employee.department = scanner.nextLine();

        System.out.print("Enter new salary: ");
        employee.salary = scanner.nextDouble();

        System.out.println("Employee updated successfully.");
    }

    // 3. Delete Employee
    public static void deleteEmployee() {
        System.out.print("Enter employee ID to delete: ");
        int id = scanner.nextInt();

        Employee employee = findEmployee(id);

        if (employee != null) {
            employees.remove(employee);
            System.out.println("Employee deleted successfully.");
        } else {
            System.out.println("Employee not found.");
        }
    }

    // 4. Search Employee
    public static void searchEmployee() {
        System.out.print("Enter employee ID to search: ");
        int id = scanner.nextInt();

        Employee employee = findEmployee(id);

        if (employee != null) {
            employee.displayEmployee();
        } else {
            System.out.println("Employee not found.");
        }
    }

    // 5. List All Employees
    public static void viewEmployees() {
        if (employees.isEmpty()) {
            System.out.println("No employees found.");
            return;
        }

        System.out.println("\nEmployee List");
        System.out.println("============================");

        for (Employee employee : employees) {
            employee.displayEmployee();
        }
    }

    // 6. Highest Salary
    public static void highestSalary() {
        if (employees.isEmpty()) {
            System.out.println("No employees found.");
            return;
        }

        Employee highest = employees.get(0);

        for (Employee employee : employees) {
            if (employee.salary > highest.salary) {
                highest = employee;
            }
        }

        System.out.println("\nEmployee with Highest Salary");
        System.out.println("============================");
        highest.displayEmployee();
    }

    // 7. Average Salary
    public static void averageSalary() {
        if (employees.isEmpty()) {
            System.out.println("No employees found.");
            return;
        }

        double total = 0;

        for (Employee employee : employees) {
            total += employee.salary;
        }

        double average = total / employees.size();

        System.out.println("Average Salary: " + average);
    }

    // 8. Department Filter
    public static void departmentFilter() {
        scanner.nextLine();

        System.out.print("Enter department: ");
        String department = scanner.nextLine();

        boolean found = false;

        System.out.println("\nEmployees in " + department);
        System.out.println("============================");

        for (Employee employee : employees) {
            if (employee.department.equalsIgnoreCase(department)) {
                employee.displayEmployee();
                found = true;
            }
        }

        if (!found) {
            System.out.println("No employees found in this department.");
        }
    }

    // Find employee by ID
    public static Employee findEmployee(int id) {
        for (Employee employee : employees) {
            if (employee.id == id) {
                return employee;
            }
        }

        return null;
    }

    // Main CLI Menu
    public static void main(String[] args) {
        int choice;

        do {
            System.out.println("\n===== Employee Management System =====");
            System.out.println("1. Add Employee");
            System.out.println("2. Update Employee");
            System.out.println("3. Delete Employee");
            System.out.println("4. Search Employee");
            System.out.println("5. List Employees");
            System.out.println("6. Highest Salary");
            System.out.println("7. Average Salary");
            System.out.println("8. Department Filter");
            System.out.println("9. Exit");
            System.out.print("Enter your choice: ");

            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    addEmployee();
                    break;

                case 2:
                    updateEmployee();
                    break;

                case 3:
                    deleteEmployee();
                    break;

                case 4:
                    searchEmployee();
                    break;

                case 5:
                    viewEmployees();
                    break;

                case 6:
                    highestSalary();
                    break;

                case 7:
                    averageSalary();
                    break;

                case 8:
                    departmentFilter();
                    break;

                case 9:
                    System.out.println("Exiting program...");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }

        } while (choice != 9);

        scanner.close();
    }
}