import { memo } from 'react';
import { Box, GridItem, Grid, Tooltip, CloseButton } from '@chakra-ui/react';

import { InputImage, OutputImage } from '@/components/play/images';
import ControlInputs from '@/components/play/controlInputs';
import CodeBlock from '@/components/play/codeBlock';
import { PlayControlProvider, IPlayControlProps } from '@/contexts/play';
import { usePlays } from '@/contexts/playground';

function PlayWithOutput({ providerValue, uniqueId }: IPlayControlProps) {
	return (
		<Box
			px="8"
			py="8"
			h="fit-inside"
			borderWidth="1px"
			borderRadius="lg"
			m="4"
			pos="relative"
			d="flex"
			alignItems="center"
			justifyContent="center">
			<Grid templateColumns="repeat(auto-fit, minmax(200px,1fr))" gap={4}>
				{/* Start The Provider is put here to prevent unnecessary rerendering */}
				<PlayControlProvider providerValue={providerValue}>
					<GridItem>
						<ControlInputs />
					</GridItem>
					<GridItem justifySelf="center" alignSelf="center">
						<InputImage src={providerValue.imgSrc} />
					</GridItem>
					<GridItem justifySelf="center" alignSelf="center">
						<OutputImage />
					</GridItem>
					<GridItem>
						<CodeBlock />
					</GridItem>
				</PlayControlProvider>
				{/* End Provider */}
			</Grid>
			<RemoveItemButton uuid={uniqueId} />
		</Box>
	);
}

function RemoveItemButton({ uuid }: { uuid: string }) {
	const { removePlay } = usePlays();

	return (
		<Tooltip label="Remove this item" hasArrow>
			<CloseButton
				size="sm"
				position="absolute"
				top="-3"
				right="-3"
				backgroundColor="red.100"
				_hover={{ bg: 'red.500' }}
				_focus={{ bg: 'red.500' }}
				onClick={() => removePlay(uuid)}
			/>
		</Tooltip>
	);
}

export default memo(
	PlayWithOutput,
	(prevProps, nextProps) => prevProps.uniqueId === nextProps.uniqueId
);
