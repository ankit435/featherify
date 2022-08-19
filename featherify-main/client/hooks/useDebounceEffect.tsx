import { useEffect, useRef } from 'react';

/**
 * hook to run an side effect after a `delay`
 * @param fn callback function to run
 * @param deps dependencies passed in the `useEffect` deps
 * @param delay the number of milliseconds after which the callback will run
 */
export default function useDebouncedEffect(
	fn: CallableFunction,
	deps: Array<any>,
	delay: number
): void {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		timerRef.current && clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => fn(), delay);
		return () => {
			timerRef.current && clearTimeout(timerRef.current);
		};
	}, [...deps, delay]);
}
