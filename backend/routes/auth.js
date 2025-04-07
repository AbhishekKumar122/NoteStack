const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "abhishekhasgoodmindset";

// ROUTE 1: Create a User using POST /api/auth/createuser No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), 
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists with this email" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create user
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      await user.save(); // Ensure we save the user properly

      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error("Signup Error:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" }); // Return JSON 
    }
  }
);


// ROUTE 2: Login a User using POST /api/auth/login No login required
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Please login with correct details" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success=false
        return res.status(400).json({ success, error: "Please login with correct details" });
        
      }

      const data = {
        user: {
          id: user.id 
        }
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get logged-in user details using POST /api/auth/getuser Login required
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      console.log("Request User:", req.user); // Log to check req.user
      const userId = req.user.id; 
      const user = await User.findById(userId).select("-password");
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
