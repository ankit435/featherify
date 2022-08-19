import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

export default function useDebouncedState<T>(
	intial: T,
	delay: number
): [T, Dispatch<SetStateAction<T>>] {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const [state, setState] = useState(intial);
	const debouncedCallback = useCallback(
		(newState) => {
			timerRef.current && clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setState(newState), delay);
		},
		[delay]
	);

	return [state, debouncedCallback];
}
