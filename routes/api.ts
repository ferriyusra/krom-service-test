import express, { Request, Response, NextFunction, Router } from 'express';

import { IReqUser } from '../util/interface';
import { ROLES } from '../util/constant';

import aclMiddleware from '../middleware/acl.middleware';
import authMiddleware from '../middleware/auth.middleware';

import AuthController from '../modules/controller/auth.controller';
import UserController from '../modules/controller/user.controller';
import { MediaController } from '../modules/controller/media.controller';

import mediaMiddleware from '../middleware/media.middleware';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;
	private userController: UserController;
	private mediaController: MediaController;

	constructor(
		authController: AuthController,
		userController: UserController,
		mediaController: MediaController
	) {
		this.router = express.Router();
		this.authController = authController;
		this.userController = userController;
		this.mediaController = mediaController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		// Auth Route
		this.router.post(
			'/v1/auth/register',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.register(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/RegisterRequest'}
			}
			*/
		);
		this.router.post(
			'/v1/auth/login',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.login(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/LoginRequest'}
			}
			*/
		);
		this.router.get(
			'/v1/auth/me',
			authMiddleware,
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.me(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.security = [{
				"bearerAuth": [],
			}]
			*/
		);

		// Media Route
		this.router.post(
			'/v1/media/upload-single',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			mediaMiddleware.single('file'),
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.mediaController.single(req, res)
		);

		this.router.delete(
			'/v1/media/remove',
			[authMiddleware, aclMiddleware([ROLES.ADMIN])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.mediaController.remove(req, res)
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (
	authController: AuthController,
	userController: UserController,
	mediaController: MediaController
): Router => {
	return new ApiRouter(
		authController,
		userController,
		mediaController
	).getRouter();
};
