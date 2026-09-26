// Primitive types
let employeeName: string = "Rafey";
let employeeId: number = 101;
let isActive: boolean = true;

console.log(employeeName);
console.log(employeeId);
console.log(isActive);


// Arrays
let skills: string[] = ["Java", "SQL", "JavaScript"];

let salaries: number[] = [40000, 50000, 60000];

console.log(skills);
console.log(salaries);


// Object
let employee: {
    id: number;
    name: string;
    department: string;
    salary: number;
} = {
    id: 101,
    name: "Rafey",
    department: "IT",
    salary: 50000
};

console.log(employee);


// Optional property
let employee2: {
    id: number;
    name: string;
    department?: string;
} = {
    id: 102,
    name: "Aisha"
};

console.log(employee2);

export {};