function deepFreeze(obj: any) {
	Object.keys(obj as Record<string, unknown>).forEach((prop) => {
		const value = (obj as Record<string, unknown>)[prop];
		if (typeof value === 'object' && value !== null) {
			deepFreeze(value);
		}
	});
	return Object.freeze(obj);
}

export { deepFreeze };
