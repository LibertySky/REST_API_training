const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const feedRoutes = require('./routes/feed');

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// set headers to any response to avoir CORS errors
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});
app.use('/feed', feedRoutes);

// error handling middleware
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 3021;
mongoose
	.connect('mongodb://localhost:27017/RestAPI-training', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	});
