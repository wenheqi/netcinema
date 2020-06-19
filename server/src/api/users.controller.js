const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersDao = require("../dao/users.dao");

const hashPassword = async (password) => await bcrypt.hash(password, 10);

class UserController {
  static async signup(req, res) {
    try {
      const hashedPassword = await hashPassword(req.body.password);
      const result = await usersDao.addUser({
        email: req.body.email,
        password: hashedPassword,
      });
      return res.send(result);
    } catch (e) {
      return res.status(500).json({
        status: "error",
        error: "Oops! Some internal error is happening. Try again later.",
      });
    }
  }

  static async signin(req, res) {
    try {
      const userFromDB = await usersDao.getUser(req.body.email);
      if (
        userFromDB === null ||
        !(await bcrypt.compare(req.body.password, userFromDB.password))
      ) {
        return res.send({
          status: "error",
          error: "Email or password is incorrect.",
        });
      }
      return res.send({
        status: "ok",
        token: jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4, ...userFromDB },
          process.env.SECRET_KEY
        ),
      });
    } catch (e) {
      return res.status(500).send({
        status: "error",
        error: "Oops! Some internal error is happening. Try again later.",
      });
    }
  }
}

exports = module.exports = UserController;
