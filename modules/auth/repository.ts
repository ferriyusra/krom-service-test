import { IRegister } from './interface';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../../util/encryption';
import { PrismaClient } from '@prisma/client';
import { createPrismaClient } from '../../util/database';

class AuthRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async userByIdentifier(identifier: string) {
		return await this.db.user.findFirst({
			where: {
				OR: [
					{
						email: identifier,
					},
					{
						fullName: identifier,
					},
				],
			},
		});
	}

	async findByUserId(userId: string | null) {
		if (!userId) return null;
		return await this.db.user.findFirst({
			where: { userId: userId },
		});
	}
}

function toDto(data: any) {
	return {
		userId: data.userId,
		fullName: data.full_name,
		email: data.email,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
}

export default AuthRepository;
