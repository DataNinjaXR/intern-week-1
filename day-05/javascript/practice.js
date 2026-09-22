let name = "Shreyash";
const age = 21;

// Function and Arrow Function
function greet(name) {
    return `Hello ${name}`;
}

const add = (a, b) => a + b;

console.log(greet(name));
console.log("Age:", age);
console.log("Addition:", add(10, 20));

// Array and Object
const employees = ["Rahul", "Amit", "Priya"];

const employee = {
    id: 101,
    name: "Rahul",
    salary: 30000
};

// Destructuring
const { id, salary } = employee;
console.log("ID:", id, "Salary:", salary);

// Spread
const newEmployees = [...employees, "Neha"];

// Array Methods
console.log("Map:", employees.map(e => e.toUpperCase()));
console.log("Filter:", employees.filter(e => e.length > 4));
console.log("Find:", employees.find(e => e === "Priya"));
console.log("Some:", employees.some(e => e === "Amit"));
console.log("Every:", employees.every(e => e.length > 2));

const salaries = [30000, 20000, 40000];

console.log("Reduce:", salaries.reduce((a, b) => a + b, 0));

salaries.sort((a, b) => a - b);
console.log("Sort:", salaries);

// Promise and async/await
const getData = () => Promise.resolve("Data loaded");

async function loadData() {
    try {
        console.log(await getData());
    } catch (error) {
        console.log("Error:", error.message);
    }
}

loadData();