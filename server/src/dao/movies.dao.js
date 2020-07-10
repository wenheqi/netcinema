let movies = null;

class MoviesDao {
  /**
   * Establishes collections handles from `netcinema` database
   * @param {*} conn MongoDB connection
   */
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.NC_NS).collection("movies");
      console.info(`Injected movies collection...`);
    } catch (e) {
      console.error(
        `Unable to establish collection handles in moives.dao: ${e}`
      );
    }
  }

  static async getMovieByID(id) {
    return await movies.findOne({ _id: id });
  }

  static async getMoviesByName(name) {
    return await movies.find({ name }).toArray();
  }

  static async getSuggestion(query) {
    let suggestedMovies = await movies
      .find({ name: { $regex: `^${query}`, $options: "i" } })
      .project({ name: 1 })
      .limit(5)
      .toArray();
    return suggestedMovies;
  }

  /**
   * Finds and returns movies by genre.
   * @param {string} genre - The genre to use in the query.
   * @param {string} initial - The movie name initial to use in the query
   * @param {number} offset - the number of movies to skip
   * @param {number} moviesPerPage - The number of movies to display per page.
   * @returns {GetMoviesResult} An object with movie results and total results
   * that would match this query
   */

  static async getMoviesByGenre({
    genre = "Action",
    initial = "A",
    offset = 0,
    moviesPerPage = 20,
  } = {}) {
    let filters = {
      genre: genre,
      name: { $regex: `^${initial}`, $options: "i" },
      image: { $exists: true },
    };
    if (initial === "_") {
      filters.name = { $regex: `^[^a-zA-z]` };
    }
    let projects = {
      name: 1,
      image: 1,
    };
    try {
      let moviesList = await movies
        .find(filters)
        .project(projects)
        .skip(offset)
        .limit(moviesPerPage)
        .sort({ name: 1, year: -1 })
        .toArray();
      return { moviesList };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [] };
    }
  }
}

exports = module.exports = MoviesDao;
