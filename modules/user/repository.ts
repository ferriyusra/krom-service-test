import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: any) {
		return null;
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
