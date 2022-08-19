import {
	Link,
	Flex,
	HStack,
	VStack,
	Icon,
	Switch,
	Box,
	Button,
	IconButton,
	CloseButton,
	useColorModeValue,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { SiGithub } from 'react-icons/si';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';

export default function NavbarContent() {
	const bg = useColorModeValue('white', 'gray.800');

	const mobileNav = useDisclosure();

	return (
		<>
			<Flex w="100%" my="2.5" h="100%" px="6" align="center" justify="space-between">
				<Flex align="center">
					<Link
						href="/"
						fontSize="2xl"
						fontWeight="hairline"
						fontFamily="monospace"
						position="relative">
						<Box
							top="-62px"
							left="-32px"
							position="absolute"
							backgroundImage={'url("/images/logo_no_bg.png")'}
							backgroundSize="cover"
							height="80px"
							width="190px"
							filter="scale(2)"
						/>
					</Link>
				</Flex>

				<Flex justify="flex-end" w="100%" maxW="824px" align="center" color="gray.400">
					<HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
						<NavButtons />
					</HStack>
					<Link
						color="red.500"
						href="https://github.com/ankit435/featherify"
						isExternal
						aria-label="GitHub Repository Link"
						ml="3">
						<Icon as={SiGithub} w="5" h="5" />
					</Link>
					<ColorModeSwitch />

					<Box display={{ base: 'inline-flex', md: 'none' }}>
						<IconButton
							display={{ base: 'flex', md: 'none' }}
							aria-label="Open menu"
							fontSize="20px"
							color={useColorModeValue('gray.800', 'inherit')}
							variant="ghost"
							icon={<AiOutlineMenu />}
							onClick={mobileNav.onOpen}
						/>
						<VStack
							pos="absolute"
							top={0}
							left={0}
							right={0}
							display={mobileNav.isOpen ? 'flex' : 'none'}
							flexDirection="column"
							p={2}
							pb={4}
							m={2}
							bg={bg}
							spacing={3}
							rounded="sm"
							shadow="sm">
							<CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
							<NavButtons />
						</VStack>
					</Box>
				</Flex>
			</Flex>
		</>
	);
}

function ColorModeSwitch() {
	const { toggleColorMode } = useColorMode();
	const switchOn = useColorModeValue(false, true);
	const text = useColorModeValue('Light', 'Dark');
	const icon = useColorModeValue(FiSun, FiMoon);

	return (
		<Box aria-label={`Switch to ${text} Mode`}>
			<Switch
				colorScheme="whiteAlpha"
				ml="10"
				isChecked={switchOn}
				onChange={toggleColorMode}
			/>
			<Icon as={icon} ml="3" />
		</Box>
	);
}

function NavButtons() {
	return (
		<>
			<a href="/play" tabIndex={-1}>
				<Button color="red" variant="ghost">
					PlayGround
				</Button>
			</a>
			<a href="/demos" tabIndex={-1}>
				<Button color="red" variant="ghost">
					Demos
				</Button>
			</a>
		</>
	);
}
