import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IUserToken } from './interface';

export const generateToken = (user: any): string => {
	const token = jwt.sign(user, config.auth.jwtSecret, {
		expiresIn: '1h',
	});
	return token;
};

export const getUserData = (token: string) => {
	const user = jwt.verify(token, config.auth.jwtSecret) as IUserToken;
	return user;
};
