import { Response } from 'express';
import UserService from '../user/service';
import response from '../../util/response';
import { IReqUser } from '../../util/interface';
import { addUserDTO } from '../user/validation';

class UserController {
	constructor(private readonly userService: UserService) {}

	async create(req: IReqUser, res: Response) {
		try {
			const { fullName, email, role } = req.body;
			await addUserDTO.validate({
				fullName,
				email,
				role,
			});

			const result = await this.userService.create({
				fullName,
				email,
				role,
			});

			return response.success(res, result, 'User added successfully');
		} catch (error) {
			return response.error(res, error, 'User added failed');
		}
	}
}

export default UserController;
