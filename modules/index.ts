import AuthRepository from './auth/repository';
import UserRepository from './user/repository';

import AuthService from './auth/service';
import UserService from './user/service';

import AuthController from './controller/auth.controller';
import UserController from './controller/user.controller';

function createAuthRepository(db: any): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

function createUserRepository(db: any): UserRepository {
	return new UserRepository(db);
}

function createUserService(repository: UserRepository): UserService {
	return new UserService(repository);
}

function createUserController(service: UserService): UserController {
	return new UserController(service);
}

export {
	// Repo
	createAuthRepository,
	createUserRepository,

	// Service
	createUserService,
	createAuthService,

	// Controller
	createAuthController,
	createUserController,
};
