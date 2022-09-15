const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");

router.post("/functionup/colleges", collegeController.registerCollege);

router.post("/functionup/interns", internController.interns);

router.get("/functionup/collegeDetails", collegeController.collegeDetails);

router.all("/*", function (req, res) {
  res.status(400).send("Invalid request....!!!");
});

module.exports = router;
