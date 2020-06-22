require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const usersRoute = require("./src/api/users.route");
const usersDao = require("./src/dao/users.dao");
const moviesRoute = require("./src/api/movies.route");
const moviesDao = require("./src/dao/movies.dao");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
process.env.NODE_ENV !== "production" && app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register api routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/movies", moviesRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../client/build")));
  app.use("*", express.static(path.join(__dirname, "../client/build")));
}

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
  MongoClient.connect(process.env.NC_DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize: 50,
    wtimeout: 2500,
  })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    })
    .then((client) => {
      console.log(`Connected to database...`);
      usersDao.injectDB(client);
      moviesDao.injectDB(client);
    });
});

exports = module.exports = app;
