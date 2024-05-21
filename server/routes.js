const express = require("express");

const router = express.Router();

// GET /list
router.get("/list", (req, res) => {
  res.status(200).json("GET request");
});

// POST /list
router.post("/list", (req, res) => {
  res.status(201).json("POST request");
});

// DELETE /list:id
router.delete("/list:id", (req, res) => {
  res.status(200).json("DELETE request");
});

// PUT /list:id
router.put("/list:id", (req, res) => {
  res.status(200).json("PUT request");
});

module.exports = router;
