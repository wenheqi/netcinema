const MoviesDao = require("../dao/movies.dao");

class MoviesController {
  static async getMovieByID(req, res) {
    let result = await MoviesDao.getMovieByID(req.params.id);
    if (result === null) {
      res.status(404).send({ status: "error", error: "movie not found" });
    }
    result.status = "ok";
    res.send(result);
  }

  static async getMoviesByName(req, res) {
    let result = await MoviesDao.getMoviesByName(req.params.name);
    if (result === null) {
      res.status(404).send({ status: "error", error: "movie not found" });
    }
    result.status = "ok";
    return res.send(result);
  }

  static async getSuggestion(req, res) {
    let suggestion = await MoviesDao.getSuggestion(req.params.query);
    return res.send(suggestion);
  }
}

exports = module.exports = MoviesController;
