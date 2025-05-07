import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../../util/encryption';
import { PrismaClient } from '@prisma/client';

class AuthRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async register(user: any) {
		const createdUser = await this.db.user.create({
			data: {
				full_name: user.fullName,
				email: user.email,
				password: encrypt(user.password),
				user_id: uuidv4(),
			},
			select: {
				user_id: true,
				full_name: true,
				email: true,
				created_at: true,
				updated_at: true,
			},
		});
		return toDto(createdUser);
	}

	async userByIdentifier(identifier: string) {
		return await this.db.user.findFirst({
			where: {
				OR: [
					{
						email: identifier,
					},
					{
						full_name: identifier,
					},
				],
			},
		});
	}

	async findByUserId(userId: string | null) {
		if (!userId) return null;
		return await this.db.user.findFirst({
			where: { user_id: userId },
		});
	}
}

function toDto(data: any) {
	return {
		userId: data.user_id,
		fullName: data.full_name,
		email: data.email,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
}

export default AuthRepository;
