import UserRepository from './repository';

class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(data: any) {
		return this.userRepository.create(data);
	}
}

export default UserService;
