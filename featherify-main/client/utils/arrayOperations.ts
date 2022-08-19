export function createArrayWithRefsHavingValue(inputs: HTMLInputElement[]): string[] {
	const strs: string[] = [];
	for (const inp of inputs) {
		if (inp && inp.value && inp.value.length > 0) {
			strs.push(inp.value);
		}
	}
	return strs;
}

export function isArrayOfStrings(datas: Array<any>): boolean {
	for (const data of datas) {
		if (typeof data !== 'string') {
			return false;
		}
	}
	return true;
}
