export default function isBase64(code: string | Record<string, unknown>): code is string {
	return typeof code === 'string';
}
