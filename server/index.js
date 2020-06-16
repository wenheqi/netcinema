const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
process.env.NODE_ENV !== "production" && app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
  app.use("*", express.static(path.join(__dirname, "../client/build")));
}

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});

exports = module.exports = app;
