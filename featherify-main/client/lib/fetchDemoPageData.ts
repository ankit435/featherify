import type { ServerResponse } from 'http';
import restler from 'restler';

import type { ConfigType, GeneratedType, SuccessFeatherType } from '@/types/index';

const newURLs = [
	'https://featherify-demos.s3.us-east-2.amazonaws.com/new_images/lion.jpg',
	'https://featherify-demos.s3.us-east-2.amazonaws.com/new_images/fishes.jpg',
	'https://featherify-demos.s3.us-east-2.amazonaws.com/new_images/seashore.jpg',
	'https://featherify-demos.s3.us-east-2.amazonaws.com/colourful.jpg',
	'https://featherify-demos.s3.us-east-2.amazonaws.com/mountains.jpg',
];

const serverURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000/api/manipulate'
		: 'https://dtam87cvk4.execute-api.us-east-2.amazonaws.com/production/api/manipulate';

export default async function fetchDemoPageData() {
	const formData = generateFormData(newURLs, 15, 15, 'css');

	return new Promise<SuccessFeatherType[]>((resolve, reject) => {
		restler
			.post(serverURL, {
				timeout: 2.5 * 60 * 1000,
				multipart: true,
				data: { ...formData },
			})
			.on('success', (data) => {
				const feathers = handleSuccess(data);
				resolve(feathers);
			})
			.on('fail', (data, response) => {
				handleError(data, response);
				reject([]);
			})
			.on('error', (data, response) => {
				handleError(data, response);
				reject([]);
			})
			.on('timeout', (data) => {
				handleError(data);
				reject([]);
			});
	});
}

function generateFormData(urls: string[], height: number, width: number, config: ConfigType) {
	const urlFormData: IFormData<string> = {};

	for (let i = 0; i < urls.length; i++) {
		urlFormData[`urls[${i}]`] = urls[i];
	}

	urlFormData['height'] = height.toString();
	urlFormData['width'] = width.toString();
	urlFormData['config'] = config;

	return urlFormData;
}

function handleSuccess(datas: GeneratedType[]) {
	const feathers: SuccessFeatherType[] = [];

	for (const data of datas) {
		if (hasStylesOrBase64(data)) {
			feathers.push(data);
		}
	}
	return feathers;
}

function handleError(data: any, response?: ServerResponse) {
	console.log('REQUEST FAILED!!!');
	console.log('DATA RECEIVED', data);
	console.log('RESPONSE STATUS CODE', response?.statusCode);
	return [];
}

function hasStylesOrBase64(obj: GeneratedType): obj is SuccessFeatherType {
	if ('error' in obj) {
		return false;
	}
	return true;
}

interface IFormData<T> {
	[key: string]: T;
}
