const express = require("express");

const router = express.Router();

// GET /list
router.get("/list", (req, res) => {
  res.status(200).json({ msg: "GET request" });
});

// POST /list
router.post("/list", (req, res) => {
  res.status(201).json({ msg: "POST request" });
});

// DELETE /list:id
router.delete("/list:id", (req, res) => {
  res.status(200).json({ msg: "DELETE request" });
});

// PUT /list:id
router.put("/list:id", (req, res) => {
  res.status(200).json({ msg: "PUT request" });
});

module.exports = router;
