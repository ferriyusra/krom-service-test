import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: 'v0.0.1',
		title: 'Docs API Krom Test',
		description: 'Docs API Krom Test',
	},
	servers: [
		{
			url: 'http://localhost:9852/api',
			description: 'Local server',
		},
		{
			url: 'https://krom-service-test.vercel.app/',
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			LoginRequest: {
				identifier: 'yourname',
				password: 'yourpassword',
			},
			createApplicants: {
				fullName: 'user33',
				email: 'user33@gmail.com',
				yearsOfExperience: 1,
				phone: '08123321',
				jobRole: 'test',
				country: 'test',
				resumeUrl: 'url',
			},
			RemoveMediaRequest: {
				fileUrl: 'mediaURL',
			},
		},
	},
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api.ts'];

swaggerAutogen({
	openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
