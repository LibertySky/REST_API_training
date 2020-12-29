const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();

// validators
// const validation = require('../middleware/validator');
// const validationSchema = require('../middleware/validationSchemas');
const { body } = require('express-validator');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

router.post(
	'/post',
	[
		body('title').trim().isLength({ min: 5, max: 150 }),
		body('content').trim().isLength({ min: 5 }),
	],
	feedController.createPost
);

router.get('/post/:postId', feedController.getPost);

router.put(
	'/post/:postId',
	[
		body('title').trim().isLength({ min: 5, max: 150 }),
		body('content').trim().isLength({ min: 5 }),
	],
	feedController.editPost
);

router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
