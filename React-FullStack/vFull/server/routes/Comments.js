const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", validateToken, async (req, res) => {
  try {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:commentId", validateToken, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
