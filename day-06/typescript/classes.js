class Employee {
    id;
    name;
    salary;
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    displayInfo() {
        console.log(`${this.id} - ${this.name} - ₹${this.salary}`);
    }
    calculateBonus() {
        return this.salary * 0.10;
    }
}
const employee = new Employee(101, "Rafey", 50000);
employee.displayInfo();
console.log("Bonus:", employee.calculateBonus());
export {};
