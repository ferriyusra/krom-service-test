export function paginate(
	data: any,
	total: number,
	paging: { page: number; limit: number }
) {
	const previousPage = paging.page - 1;
	const leftover = total / (paging.page * paging.limit);

	return {
		currentPage: paging.page,
		previousPage: previousPage || null,
		nextPage: leftover <= 1 ? null : paging.page + 1,
		total,
		perPage: paging.limit,
		data,
	};
}
