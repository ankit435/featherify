import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

import { usePlays } from '@/contexts/playground';
import { getFileDatas } from '@/lib/filesHandler';
import { getMultipleFeathers } from '@/lib/apiCalls';
import type { FileInfoType, GeneratedType } from '@/types/index';

const InputContext = createContext<IInputContext>({
	fileControl: {
		fileInfos: [],
		setFileInfos: () => {},
		handleAdd: () => Promise.resolve(),
		handleRemove: () => {},
		handleSubmit: () => {},
	},
	loadingControl: {
		loading: false,
		setLoading: () => {},
	},
	urlControl: {
		urlsCount: 1,
		submitURLs: () => {},
		setUrlsCount: () => {},
	},
});

export function InputProvider({ children }: IInputProviderProps) {
	const { addPlays } = usePlays();

	const [fileInfos, setFileInfos] = useState<FileInfoType[]>([]);

	const [urlsCount, setUrlsCount] = useState<number>(1);

	const [loading, setLoading] = useState(false);

	const handleAdd = useCallback(async (files: FileList | null) => {
		if (!files || files.length === 0) return;
		const { fileInfos } = await getFileDatas(files);
		setFileInfos((prev) => prev.concat(fileInfos));
	}, []);

	const handleRemove = useCallback(
		(idx: number) => {
			const tempArray = [...fileInfos];
			tempArray.splice(idx, 1);
			setFileInfos(tempArray);
		},
		[fileInfos]
	);

	const handleSubmit = useCallback(async () => {
		await getMultipleFeathers(fileInfos).then(({ feathers, success }) => {
			if (success) {
				addPlays(fileInfos, feathers as GeneratedType[]);
				setFileInfos([]);
			}
			setLoading(false);
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		});
	}, [addPlays, fileInfos, setFileInfos, setLoading, getMultipleFeathers]);

	const submitURLs = useCallback(
		async (urls: string[]) => {
			await getMultipleFeathers(urls).then(({ success, feathers }) => {
				if (success) {
					addPlays(urls, feathers as GeneratedType[]);
					setUrlsCount(1);
				}
				setLoading(false);
				window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
			});
		},
		[urlsCount, setUrlsCount, getMultipleFeathers]
	);

	const fileControl = useMemo(
		() => ({ fileInfos, setFileInfos, handleAdd, handleRemove, handleSubmit }),
		[fileInfos, setFileInfos, handleAdd, handleRemove, handleSubmit]
	);
	const loadingControl = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);
	const urlControl = useMemo(() => ({ urlsCount, setUrlsCount, submitURLs }), [
		urlsCount,
		setUrlsCount,
		submitURLs,
	]);

	return (
		<InputContext.Provider value={{ fileControl, loadingControl, urlControl }}>
			{children}
		</InputContext.Provider>
	);
}

export function useInputFiles() {
	return useContext(InputContext).fileControl;
}

export function useInputLoading() {
	return useContext(InputContext).loadingControl;
}

export function useInputUrls() {
	return useContext(InputContext).urlControl;
}

interface IInputContext {
	fileControl: {
		fileInfos: FileInfoType[];
		setFileInfos: Dispatch<SetStateAction<FileInfoType[]>>;
		handleAdd: (files: FileList | null) => Promise<void>;
		handleRemove: (idx: number) => void;
		handleSubmit: () => void;
	};
	loadingControl: {
		loading: boolean;
		setLoading: Dispatch<SetStateAction<boolean>>;
	};
	urlControl: {
		urlsCount: number;
		setUrlsCount: Dispatch<SetStateAction<number>>;
		submitURLs: (urls: string[]) => void;
	};
}

interface IInputProviderProps {
	children: ReactNode;
}
