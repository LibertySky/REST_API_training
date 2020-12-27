const yup = require('yup');

exports.postSchema = yup.object({
	title: yup.string().trim().min(5).required(),
	content: yup.string().trim().min(5).required(),
});
