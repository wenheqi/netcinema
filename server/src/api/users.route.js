const express = require("express");
const usersCtrl = require("./users.controller");

const router = new express.Router();

// associate CRUD operations
router.route("/signup").post(usersCtrl.signup);
router.route("/signin").post(usersCtrl.signin);
router.route("/signout").post(usersCtrl.signout);

exports = module.exports = router;
