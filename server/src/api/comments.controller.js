const CommentsDao = require("../dao/comments.dao");
const jwt = require("jsonwebtoken");

class CommentsController {
  static async getCommentsByMovieId(req, res) {
    let result = await CommentsDao.getCommentsByMovieId({
      movieId: req.params.movieId,
      offset: req.params.offset,
    });
    return res.send(result);
  }

  static async addComment(req, res) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.slice(7);
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err !== null) {
          return res.send({ status: "error" });
        }

        const newComment = {
          name: decoded.name,
          email: decoded.email,
          movieId: req.body.movieId,
          text: req.body.text,
          date: req.body.date,
        };

        const result = await CommentsDao.addComment(newComment);
        if (result.error) {
          return res.send({ status: "error" });
        }
        return res.send({ status: "ok", newComment: result.ops[0] });
      });
    }
  }

  static async updateComment(req, res) {
    return res.send({ update: "ok" });
  }

  static async deleteComment(req, res) {
    return res.send({ delete: "ok" });
  }
}

exports = module.exports = CommentsController;
