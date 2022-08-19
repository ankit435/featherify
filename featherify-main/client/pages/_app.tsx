import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '@/lib/chakraTheme';

export default function Featherify({ Component, pageProps }: AppProps) {
	return (
		<>
			<HeadTags />
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	);
}

function HeadTags() {
	return (
		<Head>
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<title>Featherify</title>
			<meta name="author" content="Ankit" />
			<meta
				name="description"
				content="Featherify is fast and highly customizable. It can generate a substitute for your high quality Image."
			/>
			<meta name="keywords" content=" hashnode, amplify, aws, lamda, hackathon, image" />

			{/* Favicons */}

			<link rel="icon" href="/images/logo_bird.png" sizes="32x32" />
			<link rel="icon" href="/images/logo_bird.png" sizes="128x128" />

			{/* <!-- Twitter --/> */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="🖥️ Featherify" />
			<meta
				name="twitter:description"
				content="Featherify is fast and highly customizable. It can generate a substitute for your high quality Image."
			/>
			<meta name="twitter:site" content="@" />
			<meta name="twitter:creator" content="@" />
			<meta name="twitter:image" content="/images/logo_original.jpg	" />

			{/* <!-- Open Graph general (Facebook, Pinterest)--/> */}
			<meta property="og:title" content="🖥️ Featherify" />
			<meta
				property="og:description"
				content="Featherify is fast and highly customizable. It can generate a substitute for your high quality Image."
			/>
			<meta property="og:url" content="https://amplifyulr.com" />
			<meta property="og:site_name" content="google.com" />
			<meta property="og:type" content="website" />
			<meta property="og:image" content="/images/logo_original.jpg" />
		</Head>
	);
}
