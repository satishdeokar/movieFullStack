const express = require("express");
const uploadImgController = require ("../controllers/uploadImage");
const extractFile = require("../middleware/uploadImage");
const router = express.Router();

router.post("/uploadImage", extractFile,uploadImgController.uploadImg);

module.exports = router;
