import dotenv from 'dotenv';
dotenv.config();

import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import helmet from 'helmet';
import createError from 'http-errors';
import morgan from 'morgan';

import { config } from './config';
import {
	CsvParsingError,
	DatabaseUniqueViolationError,
	RecordNotFoundError,
} from './error';
import logger from './util/logger';
import { createPrismaClient } from './util/database';

import {
	// Repo
	createAuthRepository,
	createUserRepository,

	// Service
	createAuthService,
	createUserService,

	// Controller
	createAuthController,
	createUserController,
} from './modules';

import apiRouter from './routes/api';
import docs from './docs/route';

logger.info('Initializing express');
const app = express();

async function main() {
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(helmet());
	app.use(cors());
	app.use(compression());

	if (app.get('env') !== 'test') {
		app.use(
			morgan((tokens, req, res) => {
				logger.info(
					`morgan ${tokens.method(req, res)} ${tokens.url(
						req,
						res
					)} ${tokens.status(req, res)}`
				);
				return null; // morgan expects a return
			})
		);
	}

	logger.info('Generating request ID');
	const generateRandomString = (length = 10): string =>
		Math.random().toString(20).substr(2, length);

	app.use(httpContext.middleware);
	app.use(
		(
			req: Request & { requestId?: string },
			_res: Response,
			next: NextFunction
		) => {
			const requestId = req.headers['request-id'] as string | undefined;
			req.requestId = requestId || generateRandomString();
			httpContext.set('requestId', req.requestId);
			next();
		}
	);

	logger.info('Initializing database');
	const db = createPrismaClient();

	// Initialize dependencies
	logger.info('Initializing dependencies');
	const authRepository = createAuthRepository(db);
	const userRepository = createUserRepository(db);

	const authService = createAuthService(authRepository);
	const userService = createUserService(userRepository);

	const authController = createAuthController(authService);
	const userController = createUserController(userService);

	// Initialize routes
	logger.info('Initializing routes');
	app.use('/api', apiRouter(authController, userController));

	// Initialize API documentation
	docs(app);

	app.get('/', (_req, res) => {
		res.send(`${config.app.name} ${config.app.env} v${config.app.version}.`);
	});

	app.use((_req, _res, next) => {
		next(createError(404));
	});

	logger.info('Initializing error handler');
	// Error Handlers
	app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
		if (err instanceof RecordNotFoundError) {
			return res.status(404).json({
				message: err.message,
				success: false,
				data: null,
				// responseTime: err.responseTime,
				__error__:
					process.env.NODE_ENV === 'development' ? err.stack : undefined,
			});
		}
		next(err);
	});

	app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
		if (err instanceof DatabaseUniqueViolationError) {
			return res.status(409).json({
				message: err.message,
				success: false,
				data: null,
				// responseTime: err.responseTime,
				__error__:
					process.env.NODE_ENV === 'development' ? err.stack : undefined,
			});
		}
		next(err);
	});

	app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
		if (err instanceof CsvParsingError) {
			return res.status(400).json({
				message: err.message,
				success: false,
				data: null,
				// responseTime: err.responseTime,
				__error__:
					process.env.NODE_ENV === 'development' ? err.stack : undefined,
			});
		}
		next(err);
	});

	app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
		if (app.get('env') !== 'test') {
			logger.error('err', err.message);
		}

		const isDebugOn =
			process.env.NODE_ENV === 'development' ||
			process.env.NODE_ENV === 'local';
		const httpCode = err.status || 500;
		let errMsg = err.message;

		if (!isDebugOn && httpCode === 500) {
			errMsg = 'Internal Server Error';
		}

		if (isDebugOn) console.error(err);

		res.status(httpCode).json({
			message: errMsg,
			success: false,
			data: null,
			responseTime: err.responseTime,
			__error__: isDebugOn ? err.stack : undefined,
		});
	});
}

main();

export default app;
