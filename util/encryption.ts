import crypto from 'crypto';
import { config } from '../config';

export const encrypt = (password: string): string => {
	const encrypted = crypto
		.pbkdf2Sync(password, config.auth.jwtSecret, 1000, 64, 'sha512')
		.toString('hex');
	return encrypted;
};
