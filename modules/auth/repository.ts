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

	async register(user: any) {
		const createdUser = await this.db.user.create({
			data: {
				fullName: user.fullName,
				email: user.email,
				password: encrypt(user.password),
				userId: uuidv4(),
				updatedAt: new Date(),
			},
			select: {
				userId: true,
				fullName: true,
				email: true,
				createdAt: true,
				updatedAt: true,
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
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}

export default AuthRepository;
