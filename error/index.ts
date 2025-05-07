class RecordNotFoundError extends Error {
	constructor() {
		super('Record not found.');
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	get statusCode() {
		// used by sentry
		return 404;
	}
}

class DatabaseUniqueViolationError extends Error {
	constructor() {
		super('Unique violation error.');
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	get statusCode() {
		// used by sentry
		return 409;
	}
}

class CsvParsingError extends Error {
	constructor(message: string) {
		super();
		this.name = this.constructor.name;
		this.message = `CSV parsing error - ${message}`;

		Error.captureStackTrace(this, this.constructor);
	}

	get statusCode() {
		// used by sentry
		return 400;
	}
}

export { CsvParsingError, DatabaseUniqueViolationError, RecordNotFoundError };
