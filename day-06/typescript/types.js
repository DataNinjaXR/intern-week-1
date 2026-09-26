const employee = {
    id: 101,
    name: "Rafey",
    salary: 50000
};
console.log(employee);
// Union type
let employeeId;
employeeId = 101;
console.log(employeeId);
employeeId = "EMP101";
console.log(employeeId);
// Union type with function
function printId(id) {
    console.log(`Employee ID: ${id}`);
}
printId(101);
printId("EMP101");
// Enum
var Department;
(function (Department) {
    Department["IT"] = "IT";
    Department["HR"] = "HR";
    Department["FINANCE"] = "Finance";
    Department["MARKETING"] = "Marketing";
})(Department || (Department = {}));
const employeeDepartment = Department.IT;
console.log(employeeDepartment);
export {};
