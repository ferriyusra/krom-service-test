import { Response } from 'express';
import ApplicationService from '../application/service';
import response from '../../util/response';
import { IReqUser } from '../../util/interface';
import { createApplication } from '../application/validation';
import ApplicantService from '../applicant/service';
import { STATUS } from '../../util/constant';
import { getPaging } from '../../util/paging';
import { getApplicantSearchable } from '../applicant/searchable';

class ApplicationController {
	constructor(
		private readonly applicationService: ApplicationService,
		private readonly applicantService: ApplicantService
	) {}

	async list(req: IReqUser, res: Response) {
		try {
			const { query } = req;
			const options: {
				country?: string;
				jobRole?: string;
				status?: string;
			} = {};

			// get paging
			const paging = getPaging(query, getApplicantSearchable());

			// add filter custom
			if (query.country) {
				options.country = String(query.country);
			}

			if (query.jobRole) {
				options.jobRole = String(query.jobRole);
			}

			if (query.status) {
				options.status = String(query.status).toUpperCase();
			}

			const { rows, count } = await this.applicantService.list(paging, options);

			return response.pagination(
				res,
				rows,
				Number(count),
				paging,
				'Success find all applicants'
			);
		} catch (error) {
			return response.error(res, error, 'Failed find all applicants');
		}
	}

	async findOne(req: IReqUser, res: Response) {
		try {
			const { id } = req.params;

			const result = await this.applicantService.findById(id);

			if (!result) {
				return response.notfound(res, 'Applicant not found');
			}

			return response.success(res, result, 'Success find one applicant');
		} catch (error) {
			return response.error(res, error, 'Failed find one applicant');
		}
	}

	async create(req: IReqUser, res: Response) {
		try {
			const {
				fullName,
				email,
				yearsOfExperience,
				phone,
				jobRole,
				country,
				resumeUrl,
			} = req.body;

			await createApplication.validate({
				fullName,
				email,
				yearsOfExperience,
				phone,
				jobRole,
				country,
				resumeUrl,
			});

			const applicant = await this.applicantService.create({
				email,
				yearsOfExperience,
				phone,
				country,
				fullName,
			});

			const application = await this.applicationService.create({
				applicantId: applicant.id,
				jobRole,
				status: STATUS.APPLIED,
				resumeUrl,
			});

			return response.success(
				res,
				application,
				'Application Submit Successfully'
			);
		} catch (error) {
			return response.error(res, error, 'Application Submit Failed');
		}
	}
}

export default ApplicationController;
