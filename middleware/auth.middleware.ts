import { Request, Response, NextFunction } from 'express';
import { getUserData } from '../util/jwt';
import { IReqUser } from '../util/interface';
import response from '../util/response';

export default (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.headers?.authorization;
	if (!authorization) {
		return response.unauthorized(res);
	}

	const [prefix, token] = authorization.split(' ');
	if (!(prefix === 'Bearer' && token)) {
		return response.unauthorized(res);
	}

	const user = getUserData(token);
	if (!user) {
		return response.unauthorized(res);
	}

	(req as IReqUser).user = user;

	next();
};
