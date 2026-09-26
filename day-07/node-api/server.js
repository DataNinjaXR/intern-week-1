const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Employee API is running",
  });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});