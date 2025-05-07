import ApplicantRepository from './repository';

class ApplicantService {
	constructor(private readonly applicantRepository: ApplicantRepository) {}

	async list(paging: any, options: any) {
		return this.applicantRepository.list(paging, options);
	}

	async create(data: any) {
		return this.applicantRepository.create(data);
	}
}

export default ApplicantService;
