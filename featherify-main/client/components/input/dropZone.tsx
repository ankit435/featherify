import { ReactNode, useRef } from 'react';
import {
	Box,
	Button,
	Flex,
	Stack,
	SimpleGrid,
	Text,
	Icon,
	Image,
	useColorModeValue,
	Heading,
} from '@chakra-ui/react';
import { VscCheck, VscClose } from 'react-icons/vsc';
import { MdError } from 'react-icons/md';
import { useInputFiles, useInputLoading } from '@/contexts/input';

export default function DropZone() {
	const { fileInfos } = useInputFiles();

	return (
		<Box my="8">
			<Heading textAlign="center" bgGradient="linear(to-l, #333333,#dd1818)" bgClip="text">
				File Feathers
			</Heading>
			<DropZoneCatcher>
				{fileInfos.length > 0 ? <DropZoneTable /> : <DropZoneInitialText />}
			</DropZoneCatcher>
		</Box>
	);
}

function DropZoneCatcher({ children }: IDropZoneCatcherProps) {
	const { handleAdd } = useInputFiles();
	return (
		<Box
			m="3"
			h="md"
			d="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			borderWidth="medium"
			borderStyle="dashed"
			borderRadius="lg"
			onDragOver={(e) => e.preventDefault()}
			onDragEnter={(e) => e.preventDefault()}
			onDragLeave={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				handleAdd(e.dataTransfer.files);
			}}>
			{children}
		</Box>
	);
}

function DropZoneInitialText() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { handleAdd } = useInputFiles();
	return (
		<>
			<Text
				fontSize="4xl"
				fontWeight="bold"
				bgGradient="linear(to-l, #1a2a6c,#b21f1f,#fdbb2d)"
				bgClip="text">
				Drag and Drop Files Here
			</Text>
			<Button
				d="block"
				colorScheme="orange"
				color="white"
				bgGradient="linear(to-l, #1a2a6c,#b21f1f,#fdbb2d)"
				mt="2.5"
				onClick={() => inputRef.current?.click()}>
				Or Click to Upload Files
				<input
					type="file"
					multiple
					ref={inputRef}
					style={{ display: 'none' }}
					onChange={(e) => handleAdd(e.target.files)}
				/>
			</Button>
		</>
	);
}

function DropZoneTable() {
	const { handleRemove, fileInfos: statuses, handleSubmit } = useInputFiles();
	const { loading, setLoading } = useInputLoading();
	return (
		<Flex mx="6.5" w="full" p={50} alignItems="center" justifyContent="center">
			<Stack
				direction={{ base: 'column' }}
				w="full"
				bg={{ sm: useColorModeValue('white', 'gray.800') }}
				shadow="lg">
				<Flex
					direction={{ base: 'row', sm: 'column' }}
					textAlign="center"
					bg={useColorModeValue('white', 'gray.800')}>
					<DropZoneTableHeader />
					{statuses.map(({ name, valid, imgSrc = '', size = '-' }, idx) => (
						<SimpleGrid
							key={`${name}-${idx}`}
							spacingY={3}
							columns={{ base: 1, sm: 5 }}
							w="full"
							py={2}
							px={10}
							verticalAlign="middle"
							fontWeight="hairline">
							<Box mx="2" display="flex" justifyContent="center">
								<Image
									htmlHeight="55px"
									htmlWidth="55px"
									src={imgSrc}
									fallback={<Icon as={MdError} />}
								/>
							</Box>
							<Text
								as="em"
								textOverflow="ellipsis"
								overflow="hidden"
								whiteSpace="nowrap"
								textAlign="center">
								{name}
							</Text>
							<Box>
								<Text as="samp">{size}</Text>
							</Box>
							<Box>
								{valid ? (
									<Icon as={VscCheck} color="green.400" />
								) : (
									<Icon as={VscClose} color="red.400" />
								)}
							</Box>
							<Button
								colorScheme="red"
								size="sm"
								width="50%"
								onClick={() => handleRemove(idx)}>
								Remove
							</Button>
						</SimpleGrid>
					))}
				</Flex>
				<Button
					type="submit"
					colorScheme="twitter"
					borderRadius="none"
					onClick={() => {
						setLoading(true);
						handleSubmit();
					}}
					isLoading={loading}>
					Upload All
				</Button>
			</Stack>
		</Flex>
	);
}

function DropZoneTableHeader() {
	return (
		<SimpleGrid
			spacingY={3}
			columns={{ base: 1, sm: 5 }}
			w={{ base: 100, sm: 'full' }}
			textTransform="uppercase"
			bg={useColorModeValue('gray.100', 'gray.700')}
			color={useColorModeValue('gray.500', 'gray.800')}
			py={{ base: 1, sm: 4 }}
			px={{ base: 2, sm: 10 }}
			fontSize="sm"
			fontWeight="extrabold">
			<Text>Display</Text>
			<Text>File Name</Text>
			<Text>Size</Text>
			<Text>Valid</Text>
		</SimpleGrid>
	);
}
interface IDropZoneCatcherProps {
	children: ReactNode;
}
