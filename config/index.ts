import { deepFreeze } from '../util';

interface AppConfig {
	env: string;
	apiKey?: string;
	name: string;
	port: number;
	version?: string;
	debug: boolean;
}

interface AuthConfig {
	jwtIssuer?: string;
	jwtSecret?: string;
}

interface QueryConfig {
	limitDefault: number;
	sortDefault: string;
}

interface Config {
	app: AppConfig;
	auth: AuthConfig;
	query: QueryConfig;
}

const config: Config = {
	app: {
		env: process.env.NODE_ENV || 'development',
		apiKey: process.env.APP_API_KEY,
		name: process.env.APP_NAME || 'service-be',
		port: Number(process.env.APP_PORT) || 3000,
		version: process.env.APP_VERSION,
		debug: !!process.env.APP_DEBUG,
	},
	auth: {
		jwtIssuer: process.env.AUTH_JWT_ISSUER,
		jwtSecret: process.env.AUTH_JWT_SECRET,
	},
	query: {
		limitDefault: Number(process.env.QUERY_LIMIT_DEFAULT) || 10,
		sortDefault: process.env.QUERY_SORT_DEFAULT || 'created_at desc',
	},
};

const dbConfig = deepFreeze(config);

export { dbConfig as config };
