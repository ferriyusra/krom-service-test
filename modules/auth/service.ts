import { IRegister } from './interface';
import AuthRepository from './repository';

class AuthService {
	constructor(private readonly authRepository: AuthRepository) {}

	async register(data: any) {
		return this.authRepository.register(data);
	}

	async userByIdentifier(identifier: string) {
		return this.authRepository.userByIdentifier(identifier);
	}

	async findById(userId: string | null) {
		return this.authRepository.findByUserId(userId);
	}
}

export default AuthService;
