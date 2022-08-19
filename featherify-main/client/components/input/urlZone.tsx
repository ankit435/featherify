import {
	useEffect,
	useCallback,
	useRef,
	createRef,
	KeyboardEvent,
	MouseEvent,
	ChangeEvent,
} from 'react';
import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react';

import { useInputLoading, useInputUrls } from '@/contexts/input';
import { createArrayWithRefsHavingValue } from '@/utils/index';

const placeholderText = 'ex. https://tinyurl.com/featherifyexample (press enter to add more urls)';

export default function UrlZone() {
	const { urlsCount, setUrlsCount, submitURLs } = useInputUrls();
	const { loading, setLoading } = useInputLoading();

	const urlRefs = useRef<HTMLInputElement[]>([]);

	const addAnotherUrl = useCallback(() => {
		setUrlsCount((p) => p + 1);
	}, [setUrlsCount]);

	const removeAUrl = useCallback(
		(idx: number) => {
			if (urlRefs.current.length === 1) return;
			urlRefs.current.splice(idx, 1);
			setUrlsCount((prev) => prev - 1);
		},
		[urlRefs, setUrlsCount]
	);

	const handleSubmit = useCallback(() => {
		setLoading(true);
		const newUrlStrs = createArrayWithRefsHavingValue(urlRefs.current);
		submitURLs(newUrlStrs);

		urlRefs.current[0].value = '';
		urlRefs.current.splice(1);
	}, [urlRefs, setUrlsCount]);

	if (urlRefs.current.length !== urlsCount) {
		urlRefs.current = Array(urlsCount)
			.fill(null)
			.map((_, i) => urlRefs.current[i] || createRef());
	}

	useEffect(() => {
		if (urlsCount > 1) {
			// to prevent focus on component mount
			urlRefs.current[urlsCount - 1].focus();
		}
	}, [urlsCount]);

	return (
		<Box my="10" mx="4">
			<Heading
				textAlign="center"
				my="4"
				bgGradient="linear(to-l, #333333,#dd1818)"
				bgClip="text">
				URL Feathers
			</Heading>
			<Flex alignItems="center" flexDirection="column">
				<Stack w="full">
					{urlRefs.current &&
						urlRefs.current.map((_, i) => (
							<Input
								key={i}
								placeholder={placeholderText}
								size="md"
								ref={(r) => r && (urlRefs.current[i] = r)}
								onKeyDown={(e) => handleKeyDown(e, addAnotherUrl)}
								onChange={(e) => handleOnChange(e, removeAUrl, i)}
							/>
						))}
				</Stack>
				<SubmitButton handleOnClick={handleSubmit} loading={loading} />
			</Flex>
		</Box>
	);
}

function SubmitButton({ handleOnClick, loading }: ISubmitButton) {
	return (
		<Button
			d="block"
			colorScheme="orange"
			color="white"
			mt="2.5"
			width="35%"
			bgGradient="linear(to-l, #1a2a6c,#b21f1f,#fdbb2d)"
			alignContent="center"
			justifyContent="center"
			isLoading={loading}
			onClick={handleOnClick}>
			Submit URLs
		</Button>
	);
}

function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, addAnotherUrl: CallableFunction) {
	if (event.key === 'Enter') {
		addAnotherUrl();
	}
}

function handleOnChange(
	event: ChangeEvent<HTMLInputElement>,
	removeUrl: CallableFunction,
	idx: number
) {
	if (event.target.value === '') {
		removeUrl(idx);
	}
}

interface ISubmitButton {
	handleOnClick: (event: MouseEvent) => void;
	loading: boolean;
}
