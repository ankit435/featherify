import type { ErrorDisplayType, FileInfoType, GeneratedType, PlayType } from '@/types/index';
import { defaultSettings, createErrorToasts } from '@/utils/index';

export default function normalize(
	inputs: FileInfoType[] | string[],
	outputs: GeneratedType[]
): INormalizeReturn {
	if (inputs.length === 0 || outputs.length === 0) {
		return { normalizedPlays: [], errors: [] };
	} else if (!inputs.some((inp: any) => typeof inp !== 'string')) {
		return normalizeURLs(inputs as string[], outputs);
	} else {
		return normalizeFiles(inputs as FileInfoType[], outputs);
	}
}

function normalizeURLs(inputs: string[], outputs: GeneratedType[]): INormalizeReturn {
	const normalizedPlays: PlayType[] = [];
	const errors: ErrorDisplayType[] = [];

	let o = 0;

	for (const i in inputs) {
		const input = inputs[i];
		const output = outputs[o];

		if (!output.error && output.uuid) {
			normalizedPlays.push({
				...defaultSettings.playSettings,
				imgSrc: input,
				code: (output.styles || output.base64) as any,
				uuid: output.uuid,
				name: output.name as string,
			});
			o++;
		} else if (output.error || !output.styles) {
			errors.push({
				title: input,
				description: output.error
					? JSON.stringify(output.error)
					: `Could not get the Feather for ${input}`,
			});
			o++;
		}
	}

	createErrorToasts(errors);

	return { normalizedPlays, errors };
}

function normalizeFiles(inputs: FileInfoType[], outputs: GeneratedType[]): INormalizeReturn {
	// for each valid input we are expecting an output

	const normalizedPlays: PlayType[] = [];
	const errors: ErrorDisplayType[] = [];

	let o = 0;

	for (const i in inputs) {
		const input = inputs[i];
		const output = outputs[o];

		if (input.valid && output.uuid) {
			normalizedPlays.push({
				...defaultSettings.playSettings,
				imgSrc: input.imgSrc as string,
				file: input.data as File,
				code: (output.styles || output.base64) as any,
				name: output.name as string,
				uuid: output.uuid,
			});
			o++;
		} else if (output.error || !output.styles) {
			errors.push({
				title: input.name,
				description: output.error
					? JSON.stringify(output.error)
					: `Could not get the Feather for ${input.name}`,
			});
			o++;
		}
	}
	return { normalizedPlays, errors };
}

interface INormalizeReturn {
	normalizedPlays: PlayType[];
	errors: ErrorDisplayType[];
}
