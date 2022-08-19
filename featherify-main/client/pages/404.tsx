import NextLink from 'next/link';
import { Container, Stack, Flex, Heading, Text, Button, useColorModeValue } from '@chakra-ui/react';

export default function NotFound() {
	return (
		<Flex align="center" justify="center" h="100vh" w="full">
			<Stack
				as={Container}
				bg={useColorModeValue('gray.50', 'gray.900')}
				rounded="xl"
				p={8}
				spacing={6}
				maxW="lg"
				align="center"
				textAlign="center">
				{/* <Icon as={Logo} w={10} h={10} /> */}
				<Stack spacing={2}>
					<Heading>Page not found</Heading>
					<Text>
						Sorry! You might have mistyped the page location since this page was not
						found.
					</Text>
				</Stack>
				<Flex>
					<NextLink href="/" passHref>
						<Button
							as="a"
							colorScheme="orange"
							rounded="full"
							bg="orange.200"
							_hover={{ bg: 'orange.400' }}>
							Take me to the Home Page
						</Button>
					</NextLink>
				</Flex>
			</Stack>
		</Flex>
	);
}
