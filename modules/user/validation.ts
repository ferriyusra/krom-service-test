import * as Yup from 'yup';

export const addUserDTO = Yup.object({
	fullName: Yup.string().required(),
	email: Yup.string().email().required(),
	role: Yup.string().required(),
});
