import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { useControl } from '@/contexts/play';
import { defaultSettings, isBase64 } from '@/utils/index';

export function InputImage({ src }: { src: string }) {
	return (
		<Box h="450px">
			<img
				src={src}
				alt={src}
				style={{
					display: 'block',
					height: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
					width: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
				}}
			/>
		</Box>
	);
}

export function OutputImage() {
	// IMPORTANT: Move styles into input if implementing modal and also pass these styles into code block

	const {
		controlState: { code, blur, scale },
	} = useControl();

	const styles = useMemo(() => {
		const receivedStyles = isBase64(code) ? {} : { ...code };
		const backgroundRepeat = isBase64(code) ? 'auto' : 'no-repeat';

		return {
			...receivedStyles,
			filter: `blur(${blur}px)`,
			transform: `scale(${scale})`,
			height: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			width: defaultSettings.PLAY_IMAGE_STYLE_DIMENSION,
			backgroundRepeat,
		};
	}, [code, blur, scale]);

	return (
		<Box h="450px" my="7">
			{isBase64(code) ? <img src={code} style={styles} /> : <div style={styles} />}
		</Box>
	);
}
