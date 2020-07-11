const Router = require("express").Router;
const CommentsCtrl = require("./comments.controller");

const router = new Router();

router.route("/:movieId/:offset").get(CommentsCtrl.getCommentsByMovieId);
router
  .route("/")
  .post(CommentsCtrl.addComment)
  .put(CommentsCtrl.updateComment)
  .delete(CommentsCtrl.deleteComment);

exports = module.exports = router;
