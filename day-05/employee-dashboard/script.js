let employees = [];
let editingId = null;

// Load employees from JSON
async function loadEmployees() {
    try {
        const response = await fetch("employees.json");
        employees = await response.json();
        displayEmployees();
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Display employees
function displayEmployees() {
    const search = document.getElementById("search").value.toLowerCase();
    const department = document.getElementById("department").value;
    const sort = document.getElementById("sort").value;

    let result = employees.filter(employee =>
        employee.name.toLowerCase().includes(search) &&
        (department === "All" || employee.department === department)
    );

    result.sort((a, b) =>
        sort === "name" ?
        a.name.localeCompare(b.name) :
        b.salary - a.salary
    );

    document.getElementById("employee-list").innerHTML = result.map(employee => `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>₹${employee.salary}</td>
            <td class="actions">
                <button onclick="showDetails(${employee.id})">Details</button>
                <button onclick="editEmployee(${employee.id})">Edit</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        </tr>
    `).join("");
}

// Show employee details
function showDetails(id) {
    const employee = employees.find(e => e.id === id);

    document.getElementById("details").innerHTML = `
        <h3>Employee Details</h3>
        <p><b>Name:</b> ${employee.name}</p>
        <p><b>Email:</b> ${employee.email}</p>
        <p><b>Department:</b> ${employee.department}</p>
        <p><b>Salary:</b> ₹${employee.salary}</p>
    `;
}

// Show add form
function showAddForm() {
    editingId = null;

    document.getElementById("form-container").innerHTML = `
        <div class="form-box">
            <input id="name" placeholder="Name">
            <input id="email" placeholder="Email">

            <select id="dept">
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
            </select>

            <input id="salary" type="number" placeholder="Salary">

            <button onclick="saveEmployee()">Save</button>
        </div>
    `;
}

// Add or update employee
function saveEmployee() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("dept").value;
    const salary = Number(document.getElementById("salary").value);

    if (!name || !email || !salary) {
        alert("Please fill all fields");
        return;
    }

    if (editingId) {
        const employee = employees.find(e => e.id === editingId);

        employee.name = name;
        employee.email = email;
        employee.department = department;
        employee.salary = salary;
    } else {
        const newEmployee = {
            id: employees.length + 1,
            name,
            email,
            department,
            salary
        };

        employees.push(newEmployee);
    }

    document.getElementById("form-container").innerHTML = "";
    displayEmployees();
}

// Edit employee
function editEmployee(id) {
    const employee = employees.find(e => e.id === id);

    editingId = id;

    document.getElementById("form-container").innerHTML = `
        <div class="form-box">
            <input id="name" value="${employee.name}">
            <input id="email" value="${employee.email}">

            <select id="dept">
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
            </select>

            <input id="salary" type="number" value="${employee.salary}">

            <button onclick="saveEmployee()">Update</button>
        </div>
    `;

    document.getElementById("dept").value = employee.department;
}

// Delete employee
function deleteEmployee(id) {
    employees = employees.filter(employee => employee.id !== id);
    displayEmployees();
}

// Search, filter and sort events
document.getElementById("search").addEventListener("input", displayEmployees);
document.getElementById("department").addEventListener("change", displayEmployees);
document.getElementById("sort").addEventListener("change", displayEmployees);

// Start application
loadEmployees();