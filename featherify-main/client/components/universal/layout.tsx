import type { ReactNode } from 'react';
import NavbarContent from '@/components/universal/navbar';
import Footer from '@/components/universal/footer';

export default function Layout({ children: WrappedComponents }: { children: ReactNode }) {
	return (
		<div>
			<NavbarContent />
			{WrappedComponents}
			<Footer />
		</div>
	);
}
