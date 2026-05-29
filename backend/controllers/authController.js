const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
    });
    console.log(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      message: "User registered successfully",
      companyName: user.companyName || "",
      companyDescription: user.companyName || "",
      companyLogo: user.companyName || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
      message: "User Logged in successfully",
      companyName: user.companyName || "",
      companyDescription: user.companyName || "",
      companyLogo: user.companyName || "",
      resume: user.resume || "",
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get logged-in user
exports.getMe = async (req, res) => {
  res.json(req.user);
};
