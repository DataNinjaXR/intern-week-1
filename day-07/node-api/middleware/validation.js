const validateEmployee = (req, res, next) => {
  const { name, email, department, salary } = req.body;

  if (!name || !email || !department || salary === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, email, department and salary are required.",
    });
  }

  if (Number.isNaN(Number(salary))) {
    return res.status(400).json({
      success: false,
      message: "Salary must be a number.",
    });
  }

  next();
};

module.exports = validateEmployee;