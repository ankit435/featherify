import { useEffect, useRef, useState } from 'react';

import type { SuccessFeatherType } from '@/types/index';

const HEIGHT = '750px';
const WIDTH = '750px';

export default function Demo({ feather }: IDemoProps) {
	const [loaded, setLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	const hasLoaded = () => {
		setLoaded(true);
	};

	const divStyles =
		(!loaded &&
			feather.styles && {
			...feather.styles,
			backgroundRepeat: 'no-repeat',
			filter: 'blur(23px)',
			width: WIDTH,
			height: HEIGHT,
		}) ||
		{};

	useEffect(() => {
		// if image is already cached
		if (imgRef.current?.complete === true) {
			hasLoaded();
		}
	}, []);

	return (
		<div style={divStyles}>
			<img
				style={{ objectFit: 'cover', height: HEIGHT, width: WIDTH }}
				ref={imgRef}
				onLoad={hasLoaded}
				src={feather.name}
				alt={feather.name}
				loading="lazy"
			/>
		</div>
	);
}

interface IDemoProps {
	feather: SuccessFeatherType;
}
