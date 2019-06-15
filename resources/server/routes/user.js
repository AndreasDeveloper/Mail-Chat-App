const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

const router = express.Router();

//Remove for production
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Works!" });
});

router.post("/signup", (req, res, next) => {
  res.status(201).json({ body: req.body });
});

module.exports = router;
