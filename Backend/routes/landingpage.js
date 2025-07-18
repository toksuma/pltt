const express = require("express");
const router = express.Router();
const db = require("../db");

// Get landing page configuration
router.get("/", (req, res) => {
  // This could be extended to include landing page specific settings
  res.json({ message: "Landing page configuration endpoint" });
});

module.exports = router;