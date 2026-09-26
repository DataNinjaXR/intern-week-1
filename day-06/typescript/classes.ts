class Employee {

    id: number;
    name: string;
    salary: number;

    constructor(
        id: number,
        name: string,
        salary: number
    ) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    displayInfo(): void {
        console.log(
            `${this.id} - ${this.name} - ₹${this.salary}`
        );
    }

    calculateBonus(): number {
        return this.salary * 0.10;
    }
}


const employee = new Employee(
    101,
    "Rafey",
    50000
);

employee.displayInfo();

console.log(
    "Bonus:",
    employee.calculateBonus()
);

export{};