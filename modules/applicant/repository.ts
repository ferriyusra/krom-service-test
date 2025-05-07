import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

class ApplicantRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async list(
		paging: {
			page: number;
			limit: number;
			search?: Record<string, { like?: string } | any>;
			sort?: string;
		},
		options: { country?: string; jobRole?: string; status?: string }
	) {
		const skip = (paging.page - 1) * paging.limit;
		const filters: any[] = [];

		if (options.country) {
			filters.push({
				applicant: { country: { equals: options.country } },
			});
		}

		if (options.jobRole) {
			filters.push({ job_role: { equals: options.jobRole } });
		}

		if (options.status) {
			filters.push({ status: { equals: options.status } });
		}

		if (paging.search) {
			for (let [key, value] of Object.entries(paging.search)) {
				if (value && typeof value === 'object' && 'like' in value) {
					const likeValue = (value as any).like as string;

					if (key.includes('.')) {
						const [relation, field] = key.split('.');
						filters.push({
							[relation]: { [field]: { contains: likeValue } },
						});
						continue;
					}

					if (key === 'full_name') {
						filters.push({
							applicant: { full_name: { contains: likeValue } },
						});
						continue;
					}

					filters.push({ [key]: { contains: likeValue } });
				} else if (value != null) {
					filters.push({ [key]: { equals: value } });
				}
			}
		}

		let orderBy = {};
		if (paging.sort) {
			const [field, dir] = paging.sort.split(' ');
			orderBy = { [field]: dir === 'desc' ? 'desc' : 'asc' };
		}

		const where = filters.length ? { AND: filters } : undefined;

		const [rows, count] = await Promise.all([
			this.db.application.findMany({
				take: paging.limit,
				skip,
				where,
				orderBy,
				include: { applicant: true },
			}),
			this.db.application.count({ where }),
		]);

		return {
			rows: rows.map(toDto),
			count,
		};
	}

	async create(data: any) {
		const created = await this.db.applicant.create({
			data: {
				applicant_id: uuidv4(),
				email: data.email,
				full_name: data.fullName,
				phone: data.phone,
				country: data.country,
				years_of_experience: data.yearsOfExperience,
			},
		});
		return toDto(created);
	}
}

function toDto(data: any) {
	let obj = {
		applicantId: data.applicant_id,
		resumeUrl: data.resume_url,
		jobRole: data.job_role,
		status: data.status,
		appliedAt: data.applied_at,
		updatedAt: data.updated_at,
	};

	if (data.applicant) {
		Object.assign(obj, {
			applicantFullName: data.applicant.full_name,
			applicantEmail: data.applicant.email,
			applicantPhone: data.applicant.phone,
			applicantCountry: data.applicant.country,
			applicantYoE: data.applicant.years_of_experience,
		});
	}

	return obj;
}

export default ApplicantRepository;
