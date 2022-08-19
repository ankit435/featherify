import {
	useReducer,
	createContext,
	useContext,
	Dispatch,
	ReactNode,
	useCallback,
	useRef,
} from 'react';

import { reducer, IAction, IActionPayload } from './reducer';
import type { PlayType, ServerActionType } from '@/types/index';
import { getSingleFeather } from '@/lib/apiCalls';
import useDebouncedEffect from '@/hooks/useDebounceEffect';

const ControlContext = createContext<IControlContext>({
	controlState: {} as any,
	dispatchControl: () => {},
	changeControlWithServer: () => {},
});

export function PlayControlProvider({ providerValue, children }: IControlProviderProps) {
	const [controlState, dispatchControl] = useReducer(reducer, providerValue);

	const serverChange = useRef<boolean>(false);

	const changeControlWithServer: IChangeControlWithServer = useCallback(
		(control) => {
			dispatchControl(control);
			serverChange.current = true;
		},
		[dispatchControl]
	);

	useDebouncedEffect(
		() => {
			// do not call to server on component mount
			if (serverChange.current) {
				serverChange.current = false;

				getSingleFeather(
					controlState.file ?? controlState.imgSrc,
					controlState.height,
					controlState.width,
					controlState.config
				).then(({ feathers, success }) => {
					if (success && feathers) {
						dispatchControl({
							type: 'NEW_CODE',
							payload: { code: feathers[0].styles ?? feathers[0].base64 },
						});
					}
				});
			}
		},
		[dispatchControl, controlState],
		250
	);

	return (
		<ControlContext.Provider value={{ controlState, dispatchControl, changeControlWithServer }}>
			{children}
		</ControlContext.Provider>
	);
}

export function useControl() {
	return useContext(ControlContext);
}

export function usePlayControlValue() {
	return useContext(ControlContext).controlState;
}

export type IPlayControlProps = Omit<IControlProviderProps, 'children'> & {
	uniqueId: string;
};

export interface IControlProviderProps {
	providerValue: PlayType;
	children: ReactNode;
}

export interface IControlContext {
	controlState: PlayType;
	dispatchControl: Dispatch<IAction>;
	changeControlWithServer: IChangeControlWithServer;
}

interface IChangeControlWithServer {
	(Control: IServerActionPayload): void;
}

interface IServerActionPayload {
	type: ServerActionType;
	payload: IActionPayload;
}
