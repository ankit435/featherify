import { createError, featherCall, IResponse } from './axios';
import { generateFormDataForFiles, generateFormDataForURLs, isArrayOfStrings } from '@/utils/index';
import type { FileInfoType } from '@/types/index';

export default async function getMultipleFeathers(
	datas: FileInfoType[] | string[]
): Promise<IResponse> {
	if (isArrayOfStrings(datas)) {
		return getFeathersFromURLs(datas as string[]);
	} else {
		return getFeathersFromFiles(datas as FileInfoType[]);
	}
}

async function getFeathersFromFiles(fileInfos: FileInfoType[]): Promise<IResponse> {
	const formdata = generateFormDataForFiles(fileInfos);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}

async function getFeathersFromURLs(urls: string[]): Promise<IResponse> {
	const formdata = generateFormDataForURLs(urls);

	return featherCall({
		data: formdata,
	})
		.then((response) => response.data)
		.then((data) => ({ success: true, feathers: data }))
		.catch((error) => createError(error));
}
