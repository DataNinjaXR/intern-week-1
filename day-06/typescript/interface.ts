// Interface
interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
    email?: string;
}

const employee: Employee = {
    id: 101,
    name: "Rafey",
    department: "IT",
    salary: 50000
};

console.log(employee);


// Interface with multiple employees
const employees: Employee[] = [
    {
        id: 1,
        name: "Rahul",
        department: "IT",
        salary: 50000
    },
    {
        id: 2,
        name: "Aisha",
        department: "HR",
        salary: 45000,
        email: "aisha@example.com"
    }
];

console.log(employees);

export {};