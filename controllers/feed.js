const { validationResult } = require('express-validator');
const Post = require('../models/post');
const errorCheck = require('../utils/errorHandler');

exports.getPosts = (req, res, next) => {
	Post.find()
		.then((posts) => {
			if (!posts) {
				const error = new Error('Could not find posts');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({
				message: 'Posts fetched successfully!',
				posts: posts,
			});
		})
		.catch((err) => {
			errorCheck(err);
		});
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(
			'Error: validation failed, entered data is incorrect'
		);
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: 'images/duck.jpg',
		creator: { name: 'LibertySky' },
	});
	post
		.save()
		.then((result) => {
			console.log(result);
			res.status(201).json({
				message: 'Post created successfully!',
				post: result,
			});
		})
		.catch((err) => {
			errorCheck(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const error = new Error('Could not find post');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ message: 'Post fetched', post: post });
		})
		.catch((err) => {
			errorCheck(err);
		});
};
