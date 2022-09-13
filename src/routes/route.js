const express = require("express");
const router = express.Router();
// const collegeController = require("../controller/");
// const internController = require("../controller/");
const auth = require("../middlewares/auth");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

router.post("/functionup/colleges");

router.post("/functionup/interns");

router.get("/functionup/collegeDetails");

module.exports = router;
