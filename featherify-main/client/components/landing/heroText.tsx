import { Container, Heading, Stack, Text, Button, Icon } from '@chakra-ui/react';
import { GiFeather } from 'react-icons/gi';
import { VscLinkExternal } from 'react-icons/vsc';

export default function CallToActionWithIllustration() {
	return (
		<Container maxW="5xl">
			<Stack
				textAlign="center"
				align="center"
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}>
				<Heading
					bgGradient="linear(to-l, #ED213A,#93291E)"
					bgClip="text"
					maxW="16ch"
					mx="auto"
					fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
					fontFamily="heading"
					letterSpacing="tighter"
					fontWeight="extrabold"
					mb="34px"
					lineHeight="1.2">
					Featherify your Image
				</Heading>
				<Text fontSize={{ base: 'lg', lg: 'xl' }} opacity={0.7} maxW="2xl">
					<strong>Featherify</strong> is fast and highly customizable. It can generate a
					lightweight <Icon as={GiFeather} /> substitute for your high quality Image.
				</Text>
				<Stack spacing={6} direction="row">
					<a href="/play" tabIndex={-1}>
						<Button rounded="full" px={6} bg="red.600" _hover={{ bg: 'red.400' }}>
							PlayGround
						</Button>
					</a>
					<a href="https://github.com/ankit435/featherify" target="_blank" rel="noreferrer noopener" tabIndex={-1}>
						<Button rounded="full" px={6} rightIcon={<VscLinkExternal />}>
							Documentation
						</Button>
					</a>
				</Stack>
			</Stack>
		</Container>
	);
}
