const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post("/create", movieController.createMovie);
router.get("/getMovies" , movieController.getMovies);
router.get("/getMovie" , movieController.getMovie);
router.delete("/deleteMovie", movieController.deleteMovie);
router.put("/updateMovie", movieController.updateMovie);

module.exports = router;
