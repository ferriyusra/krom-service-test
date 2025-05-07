import { Request } from 'express';
import { User } from '../modules/auth/validation';

export interface IReqUser extends Request {
	user?: IUserToken;
}

export interface IUserToken
	extends Omit<User, 'password' | 'email' | 'fullName'> {
	user_id?: String;
}
