const express = require("express");

const UserController = require("../controllers/userController");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup",UserController.createUser);
router.post("/login", UserController.userLogin);
module.exports = router;
