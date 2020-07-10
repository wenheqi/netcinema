const MoviesDao = require("../dao/movies.dao");

class MoviesController {
  static async getMovieByID(req, res) {
    let result = await MoviesDao.getMovieByID(req.params.id);
    if (result === null) {
      return res.send({ status: "error", error: "movie not found" });
    }
    result.status = "ok";
    res.send(result);
  }

  static async getMoviesByName(req, res) {
    let result = await MoviesDao.getMoviesByName(req.params.name);
    if (result === null) {
      return res.send({ status: "error", error: "movie not found" });
    }
    result.status = "ok";
    return res.send(result);
  }

  static async getSuggestion(req, res) {
    let suggestion = await MoviesDao.getSuggestion(req.params.query);
    return res.send(suggestion);
  }

  static async getMoviesByGenre(req, res) {
    const genre = req.params.genreId;
    const initial = req.params.initial;
    const offset = parseInt(req.params.offset);
    const moviesPerPage = 20;
    let moviesList = await MoviesDao.getMoviesByGenre({
      genre,
      initial,
      offset,
      moviesPerPage,
    });
    return res.send(moviesList);
  }
}

exports = module.exports = MoviesController;
