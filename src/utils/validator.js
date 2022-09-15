const mongoose = require("mongoose");

const isValidName = function (value) {
  if (
    typeof value === "string" &&
    value.trim().length > 0 &&
    /^[A-Z]+[a-z ]*$/.test(value)
  )
    return true;
  return false;
};
const isValid = function (value) {
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};
const isValidLink = function (value) {
  if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim.test(value))
    return true;
  return false;
};
const isValidMobile = function (value) {
  if (typeof value === "string" && /^[0-9]\d{9}$/gi.test(value)) return true;
  return false;
};
const isValidEmail = function (value) {
  if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) return true;
  return false;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.isValidObjectId(objectId);
};

module.exports = {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  isValidEmail,
  isValidName,
  isValidMobile,
  isValidLink,
};

// console.log(
//   isValidLink(
//     "https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png"
//   )
// );
