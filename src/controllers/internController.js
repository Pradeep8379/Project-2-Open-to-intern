const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const validator = require("../utils/validator");

const interns = async function (req, res) {
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;
    if (!validator.isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "incomplete request data" });
    }
    //--mandatory field--//
    if (data.isDeleted == true) {
      return res.status(400).send({
        status: false,
        message: "isDeleted must be false...",
      });
    }
    if (!validator.isValid(collegeName)) {
      return res
        .status(400)
        .send({ status: false, msg: " collegeName is required...!" });
    }
    if (!validator.isValidName(name)) {
      return res.status(400).send({
        status: false,
        msg: " Name is required and first character must be capital...!",
      });
    }
    const mobile1 = await internModel.findOne({ mobile: mobile });
    const email1 = await internModel.findOne({ email: email });
    if (!validator.isValidMobile(mobile) || mobile1) {
      return res.status(400).send({
        status: false,
        msg: "mobile is required , only 10 character and must be unique...!",
      });
    }
    if (!validator.isValidEmail(email) || email1) {
      return res.status(400).send({
        status: false,
        msg: "emailId is required and must be unique...!",
      });
    }
    const college = await collegeModel.findOne({ name: collegeName });
    if (!college) {
      return res
        .status(404)
        .send({ status: false, msg: "college not found...!" });
    }
    data.collegeId = college._id;
    let internData = await internModel.create(data);
    ["_id", "updatedAt", "createdAt", "__v"].forEach(
      (x) => delete internData._doc[x]
    );
    res.status(201).send({
      status: true,
      data: internData,
      message: "Intern created successfully..",
    });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};
module.exports = { interns };
