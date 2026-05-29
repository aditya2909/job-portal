const express = require("express");
const {
  saveJob,
  unsaveJob,
  getSavedJobs,
} = require("../controllers/savedJobController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/my").get(protect, getSavedJobs);
router.route("/:jobId").get(protect, saveJob);
router.route("/:jobId").delete(protect, unsaveJob);

module.exports = router;
