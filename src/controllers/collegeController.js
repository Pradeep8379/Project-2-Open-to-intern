const collegeModel = require("../models/collegeModel.js");
const internModel = require("../models/internModel");
const validator = require("../utils/validator");

const registerCollege = async function (req, res) {
  try {
    const requestBody = req.body;
    const { name, fullName, logoLink } = requestBody;
    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide college details ..." });
    }
    if (requestBody.isDeleted == true) {
      return res.status(400).send({
        status: false,
        message: "isDeleted must be false...",
      });
    }
    if (!validator.isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide college name ..." });
    }
    if (!validator.isValidLink(logoLink)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid logolink ..." });
    }
    if (!validator.isValid(fullName)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide college fullname ...",
        });
    }
    const college = await collegeModel.findOne({ name: name });
    if (college) {
      return res
        .status(400)
        .send({ status: false, message: "college name already exists..." });
    }
    const collegeData = await collegeModel.create(requestBody);
    ["_id", "updatedAt", "createdAt", "__v"].forEach(
      (x) => delete collegeData._doc[x]
    );
    res.status(201).send({
      status: true,
      data: collegeData,
      message: "College created successfully..",
    });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const collegeDetails = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;
    if (!validator.isValid(collegeName))
      return res
        .status(400)
        .send({ status: false, msg: "Enter a College Name..." });
    let validCollegeName = await collegeModel
      .findOne({
        name: collegeName,
        isDeleted: false,
      })
      .select({ _id: 1, name: 1, fullName: 1, logoLink: 1 });
    if (!validCollegeName)
      return res
        .status(400)
        .send({ status: false, msg: "Enter a Valid College Name..." });
    let internsList = await internModel
      .find({
        collegeId: validCollegeName._id,
        isDeleted: false,
      })
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });
    // console.log(internsList, typeof validCollegeName);
    const result = validCollegeName._doc;
    delete result["_id"];
    result.interns = internsList;
    return res.status(200).send({ status: true, data: result });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports = { registerCollege, collegeDetails };
