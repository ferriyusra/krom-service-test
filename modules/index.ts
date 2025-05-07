import AuthRepository from './auth/repository';
import ApplicationRepository from './application/repository';
import ApplicantRepository from './applicant/repository';

import AuthService from './auth/service';
import ApplicationService from './application/service';
import ApplicantService from './applicant/service';

import AuthController from './controller/auth.controller';
import ApplicationController from './controller/application.controller';

import { CloudinaryUploader } from '../util/uploader';
import { MediaController } from './controller/media.controller';
import { MediaService } from './media/media.service';

function createAuthRepository(db: any): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

function createApplicantRepository(db: any): ApplicantRepository {
	return new ApplicantRepository(db);
}

function createApplicantService(
	repository: ApplicantRepository
): ApplicantService {
	return new ApplicantService(repository);
}

function createApplicationRepository(db: any): ApplicationRepository {
	return new ApplicationRepository(db);
}

function createApplicationService(
	repository: ApplicationRepository
): ApplicationService {
	return new ApplicationService(repository);
}

function createApplicationController(
	service: ApplicationService,
	applicantService: ApplicantService
): ApplicationController {
	return new ApplicationController(service, applicantService);
}

function createMediaService(cloudinary: CloudinaryUploader): MediaService {
	return new MediaService(cloudinary);
}

function createMediaController(mediaService: MediaService): MediaController {
	return new MediaController(mediaService);
}

export {
	// Repo
	createAuthRepository,
	createApplicationRepository,
	createApplicantRepository,

	// Service
	createApplicationService,
	createApplicantService,
	createAuthService,
	createMediaService,

	// Controller
	createAuthController,
	createApplicationController,
	createMediaController,
};
