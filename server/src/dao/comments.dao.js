let comments = null;

class CommentsDao {
  /**
   * Establishes collections handles from `netcinema` database
   * @param {*} conn MongoDB connection
   */
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn.db(process.env.NC_NS).collection("comments");
      console.info(`Injected comments collection...`);
    } catch (e) {
      console.error(
        `Unable to establish collection handles in comments.dao: ${e}`
      );
    }
  }

  static async getCommentsByMovieId({ movieId, offset }) {
    const numCommentsPerPage = 20;
    let commentsList = await comments
      .find({ movieId })
      .sort({ date: -1 })
      .skip(parseInt(offset))
      .limit(numCommentsPerPage)
      .toArray();
    return { commentsList };
  }

  /**
   * Inserts a comment into the `comments` collection, with the following fields:

     - "name", the name of the user posting the comment
     - "email", the email of the user posting the comment
     - "movieId", the _id of the movie pertaining to the comment
     - "text", the text of the comment
     - "date", the date when the comment was posted

   * @param {string} movieId - The _id of the movie in the `movies` collection.
   * @param {Object} user - An object containing the user's name and email.
   * @param {string} comment - The text of the comment.
   * @param {string} date - The date on which the comment was posted.
   * @returns {DAOResponse} Returns an object with either DB response or "error"
   */
  static async addComment(newComment) {
    try {
      return await comments.insertOne(newComment);
    } catch (e) {
      console.error(`Unable to post comment: ${e}`);
      return { error: e };
    }
  }

  /**
   * Updates the comment in the comment collection. Queries for the comment
   * based by both comment _id field as well as the email field to doubly ensure
   * the user has permission to edit this comment.
   * @param {string} commentId - The _id of the comment to update.
   * @param {string} userEmail - The email of the user who owns the comment.
   * @param {string} text - The updated text of the comment.
   * @param {string} date - The date on which the comment was updated.
   * @returns {DAOResponse} Returns an object with either DB response or "error"
   */
  static async updateComment(commentId, userEmail, text, date) {
    try {
      const updateResponse = await comments.updateOne(
        { _id: ObjectId(commentId), email: userEmail },
        { $set: { text, date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteComment(commentId, userEmail) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId(commentId),
        email: userEmail,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`);
      return { error: e };
    }
  }
}

exports = module.exports = CommentsDao;
