const express = require("express");
const {
  updateProfile,
  deleteResumes,
  getPublicProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected routes
router.put("/update-profile", protect, updateProfile);
router.delete("/delete-resume", protect, deleteResumes);

// Public Route
router.get("/:id", getPublicProfile);

module.exports = router;
