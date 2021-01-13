cors = require('cors');
let io;

module.exports = {
	init: (httpServer) => {
		io = require('socket.io')(httpServer, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST'],
				allowedHeaders: ['Access-Control-Allow-Origin'],
				credentials: true,
			},
		});
		return io;
	},
	getIo: () => {
		if (!io) {
			throw new Error('Socket not initialized');
		}
		return io;
	},
};
