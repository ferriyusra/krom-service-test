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
			url: 'https://service-be-test-be.vercel.app/api',
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
			RegisterRequest: {
				fullName: 'yourname',
				email: 'youremail@mail.com',
				password: 'yourpassword',
				confirmPassword: 'yourConfirmpassword',
			},
		},
	},
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api.ts'];

swaggerAutogen({
	openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
