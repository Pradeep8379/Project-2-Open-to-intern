const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: { require: true, type: String },
    email: { require: true, type: String, unique: true },
    mobile: { require: true, type: String, unique: true },
    collegeId: { type: ObjectId, ref: "College", require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
