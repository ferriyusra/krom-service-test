import express, { Request, Response, NextFunction, Router } from 'express';

import { IReqUser } from '../util/interface';
import { ROLES } from '../util/constant';

import aclMiddleware from '../middleware/acl.middleware';
import authMiddleware from '../middleware/auth.middleware';

import AuthController from '../modules/controller/auth.controller';
import UserController from '../modules/controller/user.controller';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;
	private userController: UserController;

	constructor(authController: AuthController, userController: UserController) {
		this.router = express.Router();
		this.authController = authController;
		this.userController = userController;
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

		// User Route
		// this.router.post(
		// 	'/v1/users',
		// 	[authMiddleware, aclMiddleware([ROLES.ADMIN])],
		// 	(req: IReqUser, res: Response, _next: NextFunction) =>
		// 		this.userController.create(req, res)
		// 	/*
		// 	#swagger.tags = ['User']
		// 	#swagger.security = [{
		//   	"bearerAuth": {}
		//   }]
		// 	#swagger.requestBody = {
		// 		required: true,
		// 		schema: {$ref: '#/components/schemas/createUserRequest'}
		// 	}
		// 	*/
		// );
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (
	authController: AuthController,
	userController: UserController
): Router => {
	return new ApiRouter(authController, userController).getRouter();
};
