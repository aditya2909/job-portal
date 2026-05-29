const fs = require("fs");
const path = require("path");
const User = require("../models/User");

// @desc Update user profile {name, avatar, company details}
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      avatar,
      resume,
      companyName,
      companyDescription,
      companyLogo,
    } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.resume = resume || user.resume;

    //If employer, allow updating company info
    if (user.role === "employer") {
      user.companyName = companyName || user.companyName;
      user.companyDescription = companyDescription || user.companyDescription;
      user.companyLogo = companyLogo || user.companyLogo;
    }

    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      message: "User profile updated successfully",
      companyName: user.companyName,
      companyDescription: user.companyName,
      companyLogo: user.companyLogo,
      resume: user.resume,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteResumes = async (req, res) => {
  const { resumeUrl } = req.body;

  // Extract file name from the URL
  const fileName = resumrUrl?.split("/")?.pop();

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Construct the full file path
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Check if the file exists and then delete
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Set the user's resume in an empty string
  user.resume = "";
  await user.save();

  res.json({ message: "Resume deleted successfully" });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
