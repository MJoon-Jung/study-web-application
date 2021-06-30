const express = require('express');
const router = express.Router();
const { Post, Comment, Image, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
            }, {
                model: User,
            }]
        })
        res.status(201).json(post);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try{ 
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            UserId: req.user.id,
            PostId : req.params.postId,
        });
        res.status(201).json(post);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;