const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const employee = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = {
      id: employee.id,
      role: employee.role,
    };
    next();
  } catch (error) {
    res.status(401).send("Token did not work");
  }
};

module.exports = {
  isAuthenticated,
};
