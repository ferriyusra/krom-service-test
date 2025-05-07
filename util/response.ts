import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import * as Yup from 'yup';

export default {
	success(res: Response, data: any, message: string) {
		res.status(HttpStatusCode.Ok).json({
			meta: {
				status: HttpStatusCode.Ok,
				message,
			},
			data,
		});
	},
	notfound(res: Response, message: string = 'not found') {
		res.status(HttpStatusCode.NotFound).json({
			meta: {
				status: HttpStatusCode.NotFound,
				message,
			},
			data: null,
		});
	},
	error(res: Response, error: unknown, message: string) {
		if (error instanceof Yup.ValidationError) {
			return res.status(HttpStatusCode.BadRequest).json({
				meta: {
					status: HttpStatusCode.BadRequest,
					message,
				},
				data: {
					[`${error.path}`]: error.errors[0],
				},
			});
		}

		if (error instanceof PrismaClientKnownRequestError) {
			return res.status(500).json({
				meta: {
					status: 500,
					message: 'Internal Server Error',
				},
				data: null,
			});
		}

		if ((error as any)?.code) {
			const _err = error as any;
			return res.status(HttpStatusCode.InternalServerError).json({
				meta: {
					status: HttpStatusCode.InternalServerError,
					message: _err.errorResponse.errmsg,
				},
				data: _err,
			});
		}

		res.status(HttpStatusCode.InternalServerError).json({
			meta: {
				status: HttpStatusCode.InternalServerError,
				message,
			},
			data: error,
		});
	},
	unauthorized(res: Response, message: string = 'unauthorized') {
		res.status(HttpStatusCode.Unauthorized).json({
			meta: {
				status: HttpStatusCode.Unauthorized,
				message,
			},
			data: null,
		});
	},
	badRequest(res: Response, message: string) {
		res.status(HttpStatusCode.BadRequest).json({
			meta: {
				status: HttpStatusCode.BadRequest,
				message,
			},
			data: null,
		});
	},
	pagination(
		res: Response,
		data: any[],
		total: number,
		paging: { page: number; limit: number },
		message: string
	) {
		const previousPage = paging.page - 1;
		const leftover = total / (paging.page * paging.limit);

		res.status(HttpStatusCode.Ok).json({
			meta: {
				status: HttpStatusCode.Ok,
				message,
			},
			data,
			pagination: {
				currentPage: paging.page,
				previousPage: previousPage || null,
				nextPage: leftover <= 1 ? null : paging.page + 1,
				total,
				perPage: paging.limit,
			},
		});
	},
};
