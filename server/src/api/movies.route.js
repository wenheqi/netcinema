const Router = require("express").Router;
const MoviesCtrl = require("./movies.controller");

const router = new Router();

router.route("/id/:id").get(MoviesCtrl.getMovieByID);
router.route("/name/:name").get(MoviesCtrl.getMoviesByName);
router.route("/suggest/:query").get(MoviesCtrl.getSuggestion);

exports = module.exports = router;