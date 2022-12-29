const express = require("express");
const router = express.Router();
const UserController = require("../controller/index.js")

router.get("/user/fetch", UserController.getUserData);

router.post("/user/save", UserController.saveUserData);
module.exports = router