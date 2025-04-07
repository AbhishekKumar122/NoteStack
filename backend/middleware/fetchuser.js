const jwt = require("jsonwebtoken");
const JWT_SECRET = "abhishekhasgoodmindset";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  console.log("Token:", token); // Log the token for debugging

  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" }); //  return here
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Set user data from token
    console.log("User Data:", req.user); // Log user data for debugging
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
