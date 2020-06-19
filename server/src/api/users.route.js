const express = require("express");
const usersCtrl = require("./users.controller");

const router = new express.Router();

// associate CRUD operations
router.route("/signup").post(usersCtrl.signup);
router.route("/signin").post(usersCtrl.signin);

exports = module.exports = router;
