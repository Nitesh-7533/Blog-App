const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWt Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, bio, adminAccessToken } =
      req.body;

    // 1. Name validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required" });
    }

    // 2. Email format validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    // 3. Password validation: kam se kam 6 characters aur 1 special character
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain at least one special character",
      });
    }

    // Check agar user pehle se exist karta hai
    const userExists = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password hash karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Role assignment check
    let role = "member";
    if (
      adminAccessToken &&
      process.env.ADMIN_ACCESS_TOKEN &&
      String(adminAccessToken).trim() ===
        String(process.env.ADMIN_ACCESS_TOKEN).trim()
    ) {
      role = "admin";
    }

    // User create karein
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      profileImageUrl: profileImageUrl || "",
      bio: bio || "",
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
