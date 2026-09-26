// Type alias
type Employee = {
    id: number;
    name: string;
    salary: number;
};

const employee: Employee = {
    id: 101,
    name: "Rafey",
    salary: 50000
};

console.log(employee);


// Union type
let employeeId: number | string;

employeeId = 101;
console.log(employeeId);

employeeId = "EMP101";
console.log(employeeId);


// Union type with function
function printId(id: number | string): void {
    console.log(`Employee ID: ${id}`);
}

printId(101);
printId("EMP101");


// Enum
enum Department {
    IT = "IT",
    HR = "HR",
    FINANCE = "Finance",
    MARKETING = "Marketing"
}

const employeeDepartment: Department = Department.IT;

console.log(employeeDepartment);

export{};