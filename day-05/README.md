# Day 5 - JavaScript

## Objective

Learn modern JavaScript concepts, asynchronous programming, API integration, and develop an Employee Dashboard.

## Topics Covered

* `let` and `const`
* Data types
* Functions
* Arrow functions
* Arrays and objects
* Destructuring
* Spread and Rest operators
* Template literals
* `map()`
* `filter()`
* `reduce()`
* `find()`
* `some()`
* `every()`
* `sort()`
* Promises
* `async/await`
* Error handling
* Fetch API
* JSON data
* Search, filtering and sorting
* CRUD operations

## Project Structure

```text
day-05/

├── javascript/
│   └── javascript-practice.js
│
├── employee-dashboard/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── employees.json
│
└── README.md
```

## Employee Dashboard

The Employee Dashboard is a JavaScript-based web application that retrieves employee information from a JSON file using the Fetch API.

### Features

* Display employee records
* Search employees by information
* Filter employees based on department
* Sort employees by name and salary
* View individual employee details
* Add new employees
* Update existing employees
* Remove employees

## Technologies Used

* HTML
* CSS
* JavaScript
* JSON
* Fetch API

## How to Run

1. Open the `employee-dashboard/index.html` file in VS Code.
2. Right-click on the file.
3. Select **Open with Live Server**.
4. The Employee Dashboard will launch in the browser.

## Practical Learning

This project demonstrates modern JavaScript features and reusable functions without relying on external libraries.

Employee information is retrieved using `fetch()` with `async/await`. Search, filtering, sorting, and CRUD operations are handled directly in the browser.

## Note

The CRUD functionality in this project is currently client-side only. Any changes made to employee records remain available only while the webpage is open and are not permanently saved to the JSON file.
