import axios, { AxiosError } from 'axios';

import { createErrorToasts } from '@/utils/index';
import type { GeneratedType } from '@/types/index';

const BASEURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000/api/manipulate'
		: 'https://dtam87cvk4.execute-api.us-east-2.amazonaws.com/production/api/manipulate';

export const featherCall = axios.create({
	baseURL: BASEURL,
	timeout: 45 * 1000,
	method: 'POST',
	headers: { 'Content-Type': 'multipart/form-data' },
});

export function createError(error: AxiosError) {
	let errorName = '';
	let errorDetail = '';

	if (error.response?.data && Object.keys(error.response?.data).length > 0) {
		errorName = Object.keys(error.response?.data)[0];
		errorDetail = JSON.stringify(Object.values(error.response?.data)[0]);
	} else {
		errorName = error.name || 'Problem when during request';
		errorDetail = error.message || JSON.stringify(error);
	}

	createErrorToasts([
		{
			title: errorName,
			description: errorDetail,
			duration: 3000,
		},
	]);

	return { success: false, error: errorDetail };
}
export interface IResponse {
	success: boolean;
	feathers?: Array<GeneratedType>;
	error?: string;
}
