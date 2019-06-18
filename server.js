const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const personRouter = require("./routes/person-route");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/person-route", personRouter);

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
