const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');
const router = express.Router();

// GET /feed/posts
router.put(
	'/signup',
	[
		body('email')
			.isEmail()
			.normalizeEmail()
			.trim()
			.withMessage('Email is not valid')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject('Account with such email already exists!');
					}
				});
			}),
		body('password').trim().isLength({ min: 5 }),
		body('name').trim().notEmpty(),
	],
	authController.signup
);

module.exports = router;
