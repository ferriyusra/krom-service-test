import ApplicationRepository from './repository';

class ApplicationService {
	constructor(private readonly applicationRepository: ApplicationRepository) {}

	async create(data: any) {
		return this.applicationRepository.create(data);
	}
}

export default ApplicationService;
