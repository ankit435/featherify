import { useState, useEffect } from 'react';

/**
 * hook to return a **delayed** value which for which the param `value` frequently changes
 * @param value the value for the hook
 * @param delay the milliseconds to delay
 */
export default function useDebounceValue<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Set debouncedValue to value (passed in) after the specified delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
}
