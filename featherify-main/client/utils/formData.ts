import type { ConfigType, FileInfoType } from '@/types/index';
import { playSettings } from './defaultSettings';

export function generateFormDataForFiles(
	files: FileInfoType[],
	height: number = playSettings.height,
	width: number = playSettings.width,
	config: ConfigType = playSettings.config
): FormData {
	const fileFormData = new FormData();

	for (const file of files) {
		if (file.valid) {
			fileFormData.append('images', file.data as File);
		}
	}
	fileFormData.append('height', height.toString());
	fileFormData.append('width', width.toString());
	fileFormData.append('config', config);
	return fileFormData;
}

export function generateFormDataForURLs(
	urls: string[],
	height: number = playSettings.height,
	width: number = playSettings.width,
	config: ConfigType = playSettings.config
): FormData {
	const urlFormData = new FormData();

	for (const url of urls) {
		urlFormData.append('urls', url);
	}
	urlFormData.append('height', height.toString());
	urlFormData.append('width', width.toString());
	urlFormData.append('config', config);

	return urlFormData;
}
