#!/usr/bin/env node

import http from 'http';
import debugLib from 'debug';
import app from '../app';

const debug = debugLib('service-be:server');

const port: number = Number(process.env.APP_PORT) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
		default:
			throw error;
	}
}

function onListening(): void {
	const addr = server.address();
	if (!addr) return;

	const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
}
