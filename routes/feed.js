const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();

// validators
// const validation = require('../middleware/validator');
// const validationSchema = require('../middleware/validationSchemas');
const { body } = require('express-validator');
const isAuth = require('../middleware/isAuth');

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

router.post(
	'/post',
	isAuth,
	[
		body('title').trim().isLength({ min: 5, max: 150 }),
		body('content').trim().isLength({ min: 5 }),
	],
	feedController.createPost
);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put(
	'/post/:postId',
	isAuth,
	[
		body('title').trim().isLength({ min: 5, max: 150 }),
		body('content').trim().isLength({ min: 5 }),
	],
	feedController.editPost
);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
