const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { require: true, type: String, unique: true },
    fullName: { require: true, type: String },
    logoLink: { require: true, type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
