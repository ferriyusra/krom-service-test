import { PrismaClient } from '@prisma/client';

class ApplicationRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: any) {
		const created = await this.db.application.create({
			data: {
				applicant_id: data.applicantId,
				resume_url: data.resumeUrl,
				job_role: data.jobRole,
				status: data.status,
			},
		});
		return toDto(created);
	}
}

function toDto(data: any) {
	return {
		applicantId: data.applicant_id,
		resumeUrl: data.resume_url,
		jobRole: data.job_role,
		status: data.status,
		appliedAt: data.applied_at,
		updatedAt: data.updated_at,
	};
}

export default ApplicationRepository;
