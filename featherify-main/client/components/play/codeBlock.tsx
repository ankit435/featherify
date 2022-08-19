import { useMemo } from 'react';
import { Box, Button, ButtonProps, Code, useClipboard } from '@chakra-ui/react';

import { useControl } from '@/contexts/play';
import { defaultSettings, isBase64 } from '@/utils/index';

export default function CodeBlock() {
	const {
		controlState: { code, blur, scale },
	} = useControl();

	const copyCode = useMemo(() => {
		if (isBase64(code)) {
			return code;
		}
		const modifiedCode = {
			backgroundRepeat: 'no-repeat',
			filter: `blur(${blur}px)`,
			transform: `scale(${scale})`,
			height: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			width: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			...code,
		};
		return JSON.stringify(modifiedCode, null, 4).replace(/"([^"]+)":/g, '$1:');
	}, [code, blur, scale]);

	const { hasCopied, onCopy } = useClipboard(copyCode);

	return (
		<Box position="relative" zIndex="0" mt="-3.5" mr="-3.5">
			<Box p="4" rounded="8px">
				<Code d="block" p="2" overflowY="scroll" h={defaultSettings.PLAY_CODE_STYLE_HEIGHT}>
					{copyCode}
				</Code>
			</Box>
			<CopyButton onClick={onCopy}>{hasCopied ? 'copied' : 'copy'}</CopyButton>
		</Box>
	);
}

function CopyButton(props: ButtonProps) {
	return (
		<Button
			size="sm"
			position="absolute"
			textTransform="uppercase"
			colorScheme="orange"
			fontSize="xs"
			height="24px"
			top="1.5"
			zIndex="1"
			right="1.25em"
			{...props}
		/>
	);
}
