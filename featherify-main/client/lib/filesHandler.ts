import type { FileInfoType } from '@/types/index';

/**
 * generate a valid **fileInfo** for already valid file
 * useful request the same file to the server
 * @param name name of the file
 * @param file the file data
 */
export function generateValidFileInfo(name: string, file: File): FileInfoType {
	return { valid: true, data: file, name };
}

export async function getFileDatas(files: FileList) {
	const fileInfos: FileInfoType[] = [];

	for (let i = 0; i < files.length; i++) {
		const fileData = await getFileInfo(files[i]);

		// skip for duplicate files
		if (fileInfos.find((item) => item.name === files[i].name)) continue;

		if (isFileValid(files[i]) && fileData) {
			fileInfos.push({
				valid: true,
				name: files[i].name,
				size: getReadableFileSize(files[i].size),
				imgSrc: fileData.src,
				data: files[i],
			});
		} else {
			fileInfos.push({ valid: false, name: files[i].name });
		}
	}

	return { fileInfos };
}

function getFileInfo(file: File): Promise<{ src: string | undefined } | undefined> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			resolve({ src: e.target?.result as string | undefined });
		};
		reader.onerror = () => reject();
	});
}

function getReadableFileSize(size: number) {
	if (size === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(size) / Math.log(k));
	return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function isFileValid(file: File) {
	return ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon'].includes(file.type);
}
