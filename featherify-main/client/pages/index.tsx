import Layout from '@/components/universal/layout';
import BuiltUsing from '@/components/landing/builtUsing';
import HeroText from '@/components/landing/heroText';

export default function Home() {
	return (
		<Layout>
			<HeroText />
			<BuiltUsing />
		</Layout>
	);
}
