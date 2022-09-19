const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());

app.use(multer().any())

mongoose
  .connect("mongodb+srv://PradeepPatil:vp0T2toXsM1QqQAo@cluster0.h3sgz2m.mongodb.net/group11Database", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});
