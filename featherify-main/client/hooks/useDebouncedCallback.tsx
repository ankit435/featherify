import { useCallback, useRef } from 'react';

export default function useDebouncedCallback<T extends (...args: any[]) => any>(
	callback: T,
	deps: Array<any>,
	delay: number
): T {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	return useCallback(() => {
		timerRef.current && clearTimeout(timerRef.current);
		timerRef.current = setTimeout(callback, delay);
	}, [...deps, delay]) as T;
}
