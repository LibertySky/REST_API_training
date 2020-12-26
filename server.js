const express = require('express');
const bodyParser = require('body-parser');

// routes
const feedRoutes = require('./routes/feed');

const app = express();
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3021;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
