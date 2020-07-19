let users = null;

class UsersDao {
  /**
   * Establishes collections handles from `netcinema` database
   * @param {*} conn MongoDB connection
   */
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.NC_NS).collection("users");
      console.info(`Injected users collection...`);
    } catch (e) {
      console.error(
        `Unable to establish collection handles in users.dao: ${e}`
      );
    }
  }

  /**
   * Finds a user in the `users` collection
   * @param {string} email The email of the desired user
   * @returns {object | null} Returns either a single user or nothing
   */
  static async getUser(email) {
    return await users.findOne({ email: email });
  }

  /**
   * Adds a user to the `users` collection
   * @param {object} newUser The information of the user to add
   * @returns {ojbect} Either "ok" status or "error" with an error message
   */
  static async addUser(newUser) {
    try {
      await users.insertOne(
        {
          _id: newUser.email,
          email: newUser.email,
          name: newUser.name,
          password: newUser.password,
        },
        {
          w: "majority",
        }
      );
      return { status: "ok" };
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { status: "error", error: "This email already signed up." };
      }
      console.error(`Error occurred while adding new user:`);
      console.error(`    email: ${newUser.email}`);
      console.error(`    error: ${e}`);
      return { status: "error", error: e };
    }
  }
}

exports = module.exports = UsersDao;
