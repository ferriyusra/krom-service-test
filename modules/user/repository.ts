import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: any) {
		const createdUser = await this.db.users.create({
			data: {
				user_id: uuidv4(),
				full_name: data.fullName,
				email: data.email,
				role: data.role,
				updated_at: new Date(),
			},
			select: {
				user_id: true,
				full_name: true,
				email: true,
				role: true,
				created_at: true,
				updated_at: true,
			},
		});
		return toDto(createdUser);
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

export default UserRepository;
