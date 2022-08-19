import type { GetStaticProps } from 'next';
import { Box, Flex } from '@chakra-ui/react';

import Layout from '@/components/universal/layout';
import fetchDemoPageData from '@/lib/fetchDemoPageData';
import Demo from '@/components/demo';
import type { SuccessFeatherType } from '@/types/index';

export default function Demos(props: IProps) {
	return (
		<Layout>
			<Box mx="4" my="8">
				{props.feathers.map((feather, i) => (
					<Flex
						key={feather.uuid}
						flexDirection="column"
						my="5"
						alignItems={i % 2 === 0 ? 'flex-start' : 'flex-end'}>
						<Demo feather={feather} />
					</Flex>
				))}
			</Box>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
	const feathers = await fetchDemoPageData();

	return {
		props: {
			feathers,
		},
	};
};

interface IProps {
	feathers: SuccessFeatherType[];
}
