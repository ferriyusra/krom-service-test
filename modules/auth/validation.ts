import * as Yup from 'yup';

const validatePassword = Yup.string()
	.required()
	.min(6, 'Password must be at least 6 characters')
	.test(
		'at-least-one-uppercase-letter',
		'Contains at least one uppercase letter',
		(value) => {
			if (!value) return false;
			const regex = /^(?=.*[A-Z])/;
			return regex.test(value);
		}
	)
	.test(
		'at-least-one-number',
		'Contains at least one uppercase letter',
		(value) => {
			if (!value) return false;
			const regex = /^(?=.*\d)/;
			return regex.test(value);
		}
	);
const validateConfirmPassword = Yup.string()
	.required()
	.oneOf([Yup.ref('password'), ''], 'Password not match');

export const userLoginDTO = Yup.object({
	identifier: Yup.string().required(),
	password: validatePassword,
});

export const userUpdatePasswordDTO = Yup.object({
	oldPassword: validatePassword,
	password: validatePassword,
	confirmPassword: validateConfirmPassword,
});

export const userDTO = Yup.object({
	fullName: Yup.string().required(),
	email: Yup.string().email().required(),
	password: validatePassword,
	confirmPassword: validateConfirmPassword,
});

export type TypeUser = Yup.InferType<typeof userDTO>;

export interface User extends Omit<TypeUser, 'confirmPassword'> {
	role?: 'TEACHER' | 'USER';
	createdAt?: string;
	updatedAt?: string;
}
