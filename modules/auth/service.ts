import { IRegister } from './interface';
import AuthRepository from './repository';

class AuthService {
	constructor(private readonly authRepository: AuthRepository) {}

	async userByIdentifier(identifier: string) {
		return this.authRepository.userByIdentifier(identifier);
	}

	async findById(userId: string | null) {
		return this.authRepository.findByUserId(userId);
	}
}

export default AuthService;
