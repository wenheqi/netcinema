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
}

exports = module.exports = MoviesDao;
