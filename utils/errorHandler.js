function errorCheck(err) {
	if (!err.statusCode) {
		err.statusCode = 500;
	}
	next(err);
}

module.exports = errorCheck;
