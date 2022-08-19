import { createStandaloneToast } from '@chakra-ui/react';

import type { ErrorDisplayType } from '@/types/index';

export default async function createErrorToasts(errors: ErrorDisplayType[]) {
	for (const { title, description, duration } of errors) {
		const toast = createStandaloneToast();
		toast({
			title,
			description,
			status: 'error',
			duration: duration ?? 2000,
			isClosable: true,
			position: 'top-right',
		});
	}
}
