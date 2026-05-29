const express = require("express");
const { getEmployerAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/overview").get(protect, getEmployerAnalytics);

module.exports = router;
