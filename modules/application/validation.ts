import * as Yup from 'yup';

export const createApplication = Yup.object({
	fullName: Yup.string().required(),
	email: Yup.string().email().required(),
	yearsOfExperience: Yup.number().required(),
	phone: Yup.string().required(),
	jobRole: Yup.string().required(),
	country: Yup.string().required(),
	resumeUrl: Yup.string().required(),
});
