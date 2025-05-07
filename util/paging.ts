import { config } from '../config';
import { camelToSnakeCase } from './string';

interface QueryParams {
	page?: string | number;
	perPage?: string | number;
	sort?: string;
	[key: string]: any;
}

interface PagingResult {
	page: number;
	offset: number;
	limit: number;
	sort: string;
	search?: Record<string, any>;
}

function getPaging(query: QueryParams, searchables: string[]): PagingResult {
	const { page: pageOri, perPage, sort: sortOri, ...q } = query;

	// set page
	const page = Number(pageOri) || 1;

	// set limit
	const limit = Number(perPage) || config.query.limitDefault;

	// set sort
	let sort: string;
	if (!sortOri) {
		sort = config.query.sortDefault;
	} else {
		const sorts = sortOri.split(' ');
		const sortField = sorts[0].trim();
		const sortValue = sorts[1]?.trim().toLowerCase();

		if (
			searchables.includes(sortField) &&
			(sortValue === 'asc' || sortValue === 'desc')
		) {
			const sortFieldSnakeCase = camelToSnakeCase(sortField);
			sort = `${sortFieldSnakeCase} ${sortValue}`;
		} else {
			sort = config.query.sortDefault;
		}
	}

	// set search
	let search: Record<string, any> | undefined;
	if (Object.keys(q).length > 0) {
		for (const [k, v] of Object.entries(q)) {
			if (searchables.includes(k)) {
				if (!search) {
					search = {};
				}

				const fieldName = camelToSnakeCase(k);

				if (typeof v !== 'object' && v) {
					search[fieldName] = v;
				} else if (v?.like) {
					search[fieldName] = v;
				}
			}
		}
	}

	return {
		page,
		offset: (page - 1) * limit,
		limit,
		sort,
		search,
	};
}

export { getPaging };
