// Function with types
function add(a, b) {
    return a + b;
}
console.log(add(10, 20));
// Function returning string
function greet(name) {
    return `Welcome, ${name}`;
}
console.log(greet("Rafey"));
// Optional parameter
function displayEmployee(name, department) {
    if (department) {
        console.log(`${name} works in ${department}`);
    }
    else {
        console.log(`${name}'s department is not provided`);
    }
}
displayEmployee("Rafey", "IT");
displayEmployee("Aisha");
// Arrow function
const calculateSalary = (basic, bonus) => {
    return basic + bonus;
};
console.log(calculateSalary(50000, 5000));
// Type narrowing
function processValue(value) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
    else {
        console.log(value.toFixed(2));
    }
}
processValue("employee");
processValue(50000);
export {};
